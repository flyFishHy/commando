import {
  ICommand,
  IContext,
  IExecutor,
  IHandler,
  IMiddleware,
} from '@/types/type';

import { QueueSelector } from './QueueSelector';

export type ExecutorOptions = {
  queueSelector: QueueSelector;
  middleWare: IMiddleware;
  handler: IHandler;
};

export class Executor implements IExecutor {
  constructor(private executor: ExecutorOptions) {}
  execute(cmd: ICommand<unknown, unknown>, ctx: IContext): Promise<unknown> {
    const { queueSelector, middleWare, handler } = this.executor;
    const queue = queueSelector(cmd);
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
