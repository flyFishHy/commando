import { ICommand, IQueue } from '@/types/type';
import { ConcurrencyQueue } from './concurrency-queue';
export type QueueMode = 'serial' | 'concurrent' | string;
export type QueueSelector = (cmd: ICommand) => IQueue;
export declare function createDefaultQueueSelector(map: Record<QueueMode, IQueue>, defaultQueue: IQueue): QueueSelector;
export declare function createSimpleSelector(defaultConcurrency?: number): {
    selector: QueueSelector;
    serial: IQueue;
    concurrent: ConcurrencyQueue;
};
//# sourceMappingURL=QueueSelector.d.ts.map