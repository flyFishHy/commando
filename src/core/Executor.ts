import {
  ICommand,
  IContext,
  IExecutor,
  IHandler,
  IMiddleware,
} from '@/types/type';
import { SerialQueue } from './SerialQueue';

export type ExecutorOptions = {
  queue: SerialQueue;
  middleWare: IMiddleware;
  handler: IHandler;
};

export class Executor implements IExecutor {
  constructor(private executor: ExecutorOptions) {}
  execute(cmd: ICommand<unknown, unknown>, ctx: IContext): Promise<unknown> {
    const { queue, middleWare, handler } = this.executor;
    return queue.enqueue(async () => {
      const result = await middleWare.execute(cmd, ctx, async () => {
        const hl = handler.get(cmd.name);
        if (!hl) {
          throw new Error(`Handler for command ${cmd.name} not found`);
        }
        return hl.execute(cmd.payload, ctx);
      });
      return result;
    });
  }
}
