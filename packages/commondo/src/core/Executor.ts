import { IMiddlewarePool } from '@/middleware/middleware-pool';
import {
  ICommand,
  IContext,
  IExecutor,
  IHandler,
  ISerialQueue,
} from '@/types/type';
import { ExecutorContext } from './executor-context';

export type TExecutor = {
  queue: ISerialQueue;
  middleware: IMiddlewarePool;
  handler: IHandler;
};

export class Executor implements IExecutor {
  constructor(private executor: TExecutor) {}
  async execute<P = unknown, R = unknown>(
    cmd: ICommand<P>,
    ctx: IContext
  ): Promise<R> {
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
      const result = await queue.enqueue(() =>
        middleware.execute(cmd, executorCtx, handlerWrapper)
      );
      const finalResult = result ? result : executorCtx.lastResult;
      return finalResult as R;
    } catch (error) {
      throw new Error(`Failed to execute command ${cmd.name}: ${error}`);
    }
  }
}
