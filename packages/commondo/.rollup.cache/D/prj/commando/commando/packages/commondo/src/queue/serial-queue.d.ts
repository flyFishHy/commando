import { IQueue } from '@/types/type';
export declare class SerialQueue implements IQueue {
    private tail;
    private pendingCount;
    private idResolvers;
    enqueue<T>(task: () => Promise<T>): Promise<T>;
    isIdle(): boolean;
    size(): number;
    onIdle(): Promise<void>;
}
//# sourceMappingURL=serial-queue.d.ts.map