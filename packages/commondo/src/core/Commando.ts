import { Handler } from '@/handler/Handler';
import { MiddlewarePool } from '@/middleware/middleware-pool';
import { Plugin } from '@/plugin/Plugin';
import { SerialQueue } from '@/queue/serial-queue';
import {
  ICommand,
  ICommando,
  IHandlerDef,
  IPluginDef,
  TMiddlewareFn,
} from '@/types/type';
import { Executor } from './Executor';

export class Commando implements ICommando {
  private context: Record<string, unknown> = {};
  private plugin = new Plugin();
  private middleware = new MiddlewarePool();
  private handler = new Handler();
  private queue = new SerialQueue();
  private executor: Executor = new Executor({
    queue: this.queue,
    middleware: this.middleware,
    handler: this.handler,
  });

  usePlugin(plugin: IPluginDef): void {
    this.plugin.use(plugin, this);
  }
  useMiddleware(middleware: TMiddlewareFn, position?: 'prev' | 'post'): void {
    this.middleware.use(middleware, position);
  }

  registerHandler<P, R>(handler: IHandlerDef<P, R>): void {
    this.handler.register(handler);
  }
  execute<P, R>(cmd: ICommand<P>): Promise<R> {
    return this.executor.execute(cmd, this.context) as Promise<R>;
  }
  provide(key: string, val: unknown): void {
    this.context[key] = val;
  }
}
