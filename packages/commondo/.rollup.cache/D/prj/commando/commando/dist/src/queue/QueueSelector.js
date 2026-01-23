import { SerialQueue } from '../core/SerialQueue';
import { ConcurrencyQueue } from './concurrency-queue';
export function createDefaultQueueSelector(map, defaultQueue) {
    return (cmd) => {
        const mode = cmd.mode;
        if (!mode) {
            return defaultQueue;
        }
        return map[mode] || defaultQueue;
    };
}
export function createSimpleSelector(defaultConcurrency = 4) {
    const serial = new SerialQueue();
    const concurrent = new ConcurrencyQueue(defaultConcurrency);
    const map = {
        serial,
        concurrent,
    };
    return {
        selector: createDefaultQueueSelector(map, serial),
        serial,
        concurrent,
    };
}
//# sourceMappingURL=QueueSelector.js.map