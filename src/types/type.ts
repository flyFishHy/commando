// 定义一个通用的参数类型
type CommandArgs = unknown[];

export interface IPlugin {
  readonly name: string;
  install(commando: ICommando): void;
}

export interface IMiddleware {
  // 使用泛型 T 捕获返回类型
  <T = unknown>(
    commandName: string,
    args: CommandArgs,
    next: () => Promise<T>
  ): Promise<T>;
}

export interface ICommand<
  TArgs extends CommandArgs = CommandArgs,
  TResult = unknown,
> {
  name: string;
  execute(...args: TArgs): Promise<TResult>;
  undo?(): void;
  redo?(): void;
}

export interface IHandler {
  // Handler 执行时应保持命令的输入输出类型一致
  execute<TArgs extends CommandArgs, TResult>(
    command: ICommand<TArgs, TResult>,
    args: TArgs
  ): Promise<TResult>;
  dispose?(): void;
}

export interface ICommando {
  usePlugin(plugin: IPlugin): void;
  useMiddleware(middleware: IMiddleware): void;
  useHandler(handler: IHandler): void;
  // 执行时可以指定预期的返回类型
  execute<TResult = unknown>(
    commandName: string,
    args: CommandArgs
  ): Promise<TResult>;
  undo?(): void;
  redo?(): void;
}
