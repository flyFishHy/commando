import { IQueue } from '@/types/type';
export declare class ConcurrencyQueue implements IQueue {
    private concurrencyLimit;
    private queue;
    private runningCount;
    private idleResolvers;
    constructor(concurrencyLimit?: number);
    enqueue<T = unknown>(task: () => Promise<T>): Promise<T>;
    private next;
    private checkIdle;
    isIdle(): boolean;
    size(): number;
    onIdle(): Promise<void>;
}
//# sourceMappingURL=concurrency-queue.d.ts.map