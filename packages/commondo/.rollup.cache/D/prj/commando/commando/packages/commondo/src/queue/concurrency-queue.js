export class ConcurrencyQueue {
    concurrencyLimit;
    queue = [];
    runningCount = 0;
    idleResolvers = [];
    constructor(concurrencyLimit = 10) {
        this.concurrencyLimit = concurrencyLimit;
    }
    enqueue(task) {
        return new Promise((resolve, reject) => {
            const queueItem = {
                task,
                resolve,
                reject,
            };
            this.queue.push(queueItem);
            this.next();
        });
    }
    next() {
        while (this.runningCount < this.concurrencyLimit && this.queue.length > 0) {
            const item = this.queue.shift();
            if (!item)
                break;
            this.runningCount++;
            Promise.resolve()
                .then(() => item.task())
                .then((res) => item.resolve(res))
                .catch((err) => item.reject(err))
                .finally(() => {
                this.runningCount--;
                this.next();
                this.checkIdle();
            });
        }
    }
    checkIdle() {
        if (this.isIdle() && this.idleResolvers.length > 0) {
            const resolvers = this.idleResolvers;
            this.idleResolvers = [];
            resolvers.forEach((r) => r());
        }
    }
    isIdle() {
        return this.runningCount === 0 && this.queue.length === 0;
    }
    size() {
        return this.runningCount + this.queue.length;
    }
    onIdle() {
        if (this.isIdle()) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.idleResolvers.push(resolve);
        });
    }
}
//# sourceMappingURL=concurrency-queue.js.map