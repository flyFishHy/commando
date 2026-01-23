import { ISerialQueue } from '@/types/type';
export declare class SerialQueue implements ISerialQueue {
    private tail;
    private pendingCount;
    private idResolvers;
    enqueue<T>(task: () => Promise<T>): Promise<T>;
    isIdle(): boolean;
    size(): number;
    onIdle(): Promise<void>;
}
//# sourceMappingURL=SerialQueue.d.ts.map