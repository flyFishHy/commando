import { ExecutorContext } from './executor-context';
export class Executor {
    executor;
    constructor(executor) {
        this.executor = executor;
    }
    async execute(cmd, ctx) {
        const { queue, middleware, handler } = this.executor;
        const executorCtx = new ExecutorContext({ envCtx: Object.create(ctx) });
        const handlerWrapper = async () => {
            const hl = handler.get(cmd.name);
            if (!hl) {
                throw new Error(`Handler for command ${cmd.name} not found`);
            }
            const result = await hl.execute(cmd.payload, executorCtx);
            executorCtx.lastResult = result;
            return result;
        };
        try {
            const result = await queue.enqueue(() => middleware.execute(cmd, executorCtx, handlerWrapper));
            const finalResult = result ? result : executorCtx.lastResult;
            return finalResult;
        }
        catch (error) {
            throw new Error(`Failed to execute command ${cmd.name}: ${error}`);
        }
    }
}
//# sourceMappingURL=Executor.js.map