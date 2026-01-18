export interface IPluginDef {
  readonly name: string;
  dependency?: string[];
  setup(commando: ICommando): void;
  dispose?(): void;
}
export interface IPlugin {
  use(plugin: IPluginDef, co: ICommando): void;
} // 将默认值设为 unknown

export type QueueMode = 'serial' | 'concurrent' | string;
export interface ICommand<P = unknown, R = unknown> {
  cmdId: string;
  readonly name: string;
  readonly payload: P;
  readonly _resultType?: R;
  meta?: Record<string, unknown>;
  mode?: QueueMode;
}

export interface IMiddlewareDef {
  readonly name?: string;
  execute: (
    cmd: ICommand<unknown, unknown>,
    ctx: IContext,
    next: () => Promise<unknown>
  ) => Promise<unknown>;
}

// 中间件处理 unknown 类型
export interface IMiddleware {
  use: (mw: IMiddlewareDef) => void;
  execute: (
    cmd: ICommand<unknown, unknown>,
    ctx: IContext,
    next: () => Promise<unknown>
  ) => Promise<unknown>;
}

// Handler 也使用 unknown
export interface IHandlerDef<P = unknown, R = unknown> {
  readonly name: string;
  execute(payload: P, ctx: IContext): Promise<R>;
  dispose?(): void;
}

export interface IHandler {
  register(hl: IHandlerDef): void;
  get(name: string): IHandlerDef | undefined;
  dispose(name: string): void;
}

export interface ICommando {
  usePlugin(plugin: IPluginDef): void;
  useMiddleware(middleware: IMiddleware): void;

  // 注册时使用泛型推断，避免出现 IHandler<any, any>
  registerHandler<P, R>(handler: IHandlerDef<P, R>): void;

  // 执行时通过推断获取 R
  execute<P, R>(cmd: ICommand<P, R>): Promise<R>;

  provide(key: string, val: unknown): void;
}

export interface IContext {
  [key: string]: unknown;
}
export interface IExecutor {
  execute(cmd: ICommand<unknown, unknown>, ctx: IContext): Promise<unknown>;
}

export interface IQueue {
  enqueue<T>(task: () => Promise<T>): Promise<T>;
}

export interface ISerialQueue extends IQueue {
  enqueue<T>(task: () => Promise<T>): Promise<T>;
  isIdle(): boolean;
  size(): number;
  onIdle(): Promise<void>;
}

export interface IConcurrencyQueueItem<T = unknown> {
  task: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
}

export interface IConcurrencyQueue extends IQueue {
  enqueue<T = unknown>(task: () => Promise<T>): Promise<T>;
  isIdle(): boolean;
  size(): number;
  onIdle(): Promise<void>;
}
