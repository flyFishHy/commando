import { IExecutorContextDef } from '@/types/type';
export declare class ExecutorContext implements IExecutorContextDef {
    readonly id: string;
    readonly traceId: string;
    state: {};
    lastResult?: unknown;
    startAt?: number | undefined;
    envCtx?: Record<string, unknown> | undefined;
    constructor(opts: {
        state?: Record<string, unknown>;
        lastResult?: unknown;
        startAt?: number;
        envCtx?: Record<string, unknown>;
    });
}
//# sourceMappingURL=executor-context.d.ts.map