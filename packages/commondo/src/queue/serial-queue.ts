import { IQueue } from '@/types/type';

/**
 *  串行任务队列
 */
export class SerialQueue implements IQueue {
  private tail: Promise<unknown> = Promise.resolve();
  private pendingCount = 0;
  private idResolvers: Array<() => void> = [];

  enqueue<T>(task: () => Promise<T>): Promise<T> {
    this.pendingCount++;
    const nextTask = this.tail.then(() => task());
    this.tail = nextTask.then(
      () => undefined,
      () => undefined
    );
    nextTask.finally(() => {
      this.pendingCount--;
      if (this.pendingCount === 0) {
        this.idResolvers.forEach((resolve) => resolve());
        this.idResolvers = [];
      }
    });
    return nextTask;
  }

  isIdle(): boolean {
    return this.pendingCount === 0;
  }

  size(): number {
    return this.pendingCount;
  }

  onIdle(): Promise<void> {
    if (this.isIdle()) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.idResolvers.push(resolve);
    });
  }
}
