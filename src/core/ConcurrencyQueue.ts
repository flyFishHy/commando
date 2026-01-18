import { IConcurrencyQueue, IConcurrencyQueueItem } from '@/types/type';

export class ConcurrencyQueue implements IConcurrencyQueue {
  private queue: Array<IConcurrencyQueueItem<unknown>> = [];
  private runningCount = 0;
  private idleResolvers: Array<() => void> = [];
  constructor(private concurrencyLimit: number = 10) {}
  enqueue<T = unknown>(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const queueItem: IConcurrencyQueueItem<T> = {
        task,
        resolve,
        reject,
      };
      this.queue.push(queueItem as IConcurrencyQueueItem<unknown>);
      this.next();
    });
  }

  private next(): void {
    // 只要还有空位且队列有任务，就持续启动
    while (this.runningCount < this.concurrencyLimit && this.queue.length > 0) {
      const item = this.queue.shift(); // 获取任务对象
      if (!item) break;

      this.runningCount++;

      // 使用 Promise.resolve 兼容同步/异步任务
      Promise.resolve()
        .then(() => item.task())
        .then((res) => item.resolve(res))
        .catch((err) => item.reject(err))
        .finally(() => {
          this.runningCount--;
          this.next(); // 递归驱动
          this.checkIdle(); // 检查是否可以触发 onIdle
        });
    }
  }

  private checkIdle() {
    if (this.isIdle() && this.idleResolvers.length > 0) {
      const resolvers = this.idleResolvers;
      this.idleResolvers = [];
      resolvers.forEach((r) => r());
    }
  }

  isIdle(): boolean {
    return this.runningCount === 0 && this.queue.length === 0;
  }

  size(): number {
    return this.runningCount + this.queue.length;
  }
  onIdle(): Promise<void> {
    if (this.isIdle()) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.idleResolvers.push(resolve);
    });
  }
}
