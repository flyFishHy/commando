import { IMiddlewarePool } from '@/middleware/middleware-pool';
import { ICommand, IContext, IExecutor, IHandler, ISerialQueue } from '@/types/type';
export type TExecutor = {
    queue: ISerialQueue;
    middleware: IMiddlewarePool;
    handler: IHandler;
};
export declare class Executor implements IExecutor {
    private executor;
    constructor(executor: TExecutor);
    execute<P = unknown, R = unknown>(cmd: ICommand<P>, ctx: IContext): Promise<R>;
}
//# sourceMappingURL=Executor.d.ts.map