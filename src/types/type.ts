export interface IPluginDef {
  readonly name: string;
  dependency?: string[];
  install(commando: ICommando): void;
}
export interface IPlugin {
  use(plugin: IPluginDef, co: ICommando): void;
} // 将默认值设为 unknown
export interface ICommand<P = unknown, R = unknown> {
  readonly name: string;
  readonly payload: P;
  readonly _resultType?: R;
}

export interface IMiddlewareDef {
  readonly name?: string;
  execute: (
    cmd: ICommand<unknown, unknown>,
    next: () => Promise<unknown>
  ) => Promise<unknown>;
}

// 中间件处理 unknown 类型
export interface IMiddleware {
  use: (mw: IMiddlewareDef) => void;
  execute: (
    cmd: ICommand<unknown, unknown>,
    next: () => Promise<unknown>
  ) => Promise<unknown>;
}

// Handler 也使用 unknown
export interface IHandlerDef<P = unknown, R = unknown> {
  readonly name: string;
  execute(payload: P): Promise<R>;
  dispose?(): void;
}

export interface IHandler {
  register(hl: IHandlerDef): void;
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

export interface Executor {
  execute(cmd: ICommand<unknown, unknown>): Promise<unknown>;
}
