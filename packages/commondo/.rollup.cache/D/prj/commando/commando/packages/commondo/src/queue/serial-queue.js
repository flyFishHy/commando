export class SerialQueue {
    tail = Promise.resolve();
    pendingCount = 0;
    idResolvers = [];
    enqueue(task) {
        this.pendingCount++;
        const nextTask = this.tail.then(() => task());
        this.tail = nextTask.then(() => undefined, () => undefined);
        nextTask.finally(() => {
            this.pendingCount--;
            if (this.pendingCount === 0) {
                this.idResolvers.forEach((resolve) => resolve());
                this.idResolvers = [];
            }
        });
        return nextTask;
    }
    isIdle() {
        return this.pendingCount === 0;
    }
    size() {
        return this.pendingCount;
    }
    onIdle() {
        if (this.isIdle()) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.idResolvers.push(resolve);
        });
    }
}
//# sourceMappingURL=serial-queue.js.map