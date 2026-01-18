import { Handler } from '@/handler/Handler';
import { Middleware } from '@/middleware/Middleware';
import { Plugin } from '@/plugin/Plugin';
import {
  ICommand,
  ICommando,
  IHandlerDef,
  IMiddleware,
  IPluginDef,
} from '@/types/type';
import { Executor } from './Executor';
import { QueueSelector } from './QueueSelector';

class Commando implements ICommando {
  private _context: Record<string, unknown> = {};
  private _plugin = new Plugin();
  private _middleware = new Middleware();
  private _handler = new Handler();

  private _executor: Executor;

  constructor(opts: { queueSelector: QueueSelector }) {
    this._executor = new Executor({
      queueSelector: opts.queueSelector,
      middleWare: this._middleware,
      handler: this._handler,
    });
  }

  usePlugin(plugin: IPluginDef): void {
    this._plugin.use(plugin, this);
  }
  useMiddleware(middleware: IMiddleware): void {
    this._middleware.use(middleware);
  }
  registerHandler<P, R>(handler: IHandlerDef<P, R>): void {
    this._handler.register(handler);
  }
  execute<P, R>(cmd: ICommand<P, R>): Promise<R> {
    this._context = Object.create(this._context);
    return this._executor.execute(cmd, this._context) as Promise<R>;
  }
  provide(key: string, val: unknown): void {
    this._context[key] = val;
  }
}

export default Commando;
