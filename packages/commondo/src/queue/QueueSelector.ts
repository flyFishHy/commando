import { ICommand, IQueue } from '@/types/type';
import { SerialQueue } from '../core/SerialQueue';
import { ConcurrencyQueue } from './concurrency-queue';

export type QueueMode = 'serial' | 'concurrent' | string;
export type QueueSelector = (cmd: ICommand) => IQueue;

export function createDefaultQueueSelector(
  map: Record<QueueMode, IQueue>,
  defaultQueue: IQueue
): QueueSelector {
  return (cmd: ICommand) => {
    const mode = cmd.mode as QueueMode;
    if (!mode) {
      return defaultQueue;
    }
    return map[mode] || defaultQueue;
  };
}

export function createSimpleSelector(defaultConcurrency = 4) {
  const serial: IQueue = new SerialQueue();
  const concurrent = new ConcurrencyQueue(defaultConcurrency);

  const map: Record<QueueMode, IQueue> = {
    serial,
    concurrent,
  };

  return {
    selector: createDefaultQueueSelector(map, serial),
    serial,
    concurrent,
  };
}
