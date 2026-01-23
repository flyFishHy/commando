import { IdGenerator } from '@/shared/IdGenerator';
export class ExecutorContext {
    id = IdGenerator.next('ExecutorContext');
    traceId = IdGenerator.next('Trace');
    state = {};
    lastResult;
    startAt;
    envCtx;
    constructor(opts) {
        this.state = opts.state || {};
        this.lastResult = opts.lastResult;
        this.startAt = opts.startAt;
        this.envCtx = opts.envCtx;
    }
}
//# sourceMappingURL=executor-context.js.map