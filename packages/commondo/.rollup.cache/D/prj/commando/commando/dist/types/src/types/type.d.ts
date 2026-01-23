export interface IPluginDef {
    readonly name: string;
    dependency?: string[];
    setup(commando: ICommando): void;
    dispose?(): void;
}
export interface IPlugin {
    use(plugin: IPluginDef, co: ICommando): void;
}
export type QueueMode = 'serial' | 'concurrent' | string;
export interface ICommandDef<P = unknown> {
    readonly cmdId?: string;
    readonly name: string;
    readonly payload: P;
    meta?: Record<string, unknown>;
}
export interface IExecutorContextDef {
    readonly id: string;
    readonly traceId?: string;
    state?: Record<string, unknown>;
    lastResult?: unknown;
    startAt?: number;
    envCtx?: Record<string, unknown>;
}
export interface ICommand<P = unknown> {
    cmdId: string;
    readonly name: string;
    readonly payload: P;
    meta?: Record<string, unknown>;
    mode?: QueueMode;
}
export type TNextFn = () => Promise<unknown>;
export type TMiddlewareFn = (cmd: ICommandDef<unknown>, ctx: IExecutorContextDef, core: TNextFn) => Promise<unknown>;
export interface IMiddlewareDef {
    readonly name?: string;
    execute: (cmd: ICommand<unknown>, ctx: IContext, next: TNextFn) => Promise<unknown>;
}
export interface IMiddleware {
    use: (mw: IMiddlewareDef) => void;
    execute: (cmd: ICommand<unknown>, ctx: IContext, next: () => Promise<unknown>) => Promise<unknown>;
}
export interface IHandlerDef<P = unknown, R = unknown> {
    readonly name: string;
    execute(payload: P, ctx: IExecutorContextDef): Promise<R>;
    dispose?(): void;
}
export interface IHandler {
    register(hl: IHandlerDef): void;
    get(name: string): IHandlerDef | undefined;
    dispose(name: string): void;
}
export interface ICommando {
    usePlugin(plugin: IPluginDef): void;
    useMiddleware(middleware: TMiddlewareFn, position?: 'prev' | 'post'): void;
    registerHandler<P, R>(handler: IHandlerDef<P, R>): void;
    execute<P, R>(cmd: ICommand<P>): Promise<R>;
    provide(key: string, val: unknown): void;
}
export interface IContext {
    [key: string]: unknown;
}
export interface IExecutor {
    execute(cmd: ICommand<unknown>, ctx: IContext): Promise<unknown>;
}
export interface IQueue {
    enqueue<T>(task: () => Promise<T>): Promise<T>;
    isIdle(): boolean;
    size(): number;
    onIdle(): Promise<void>;
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
//# sourceMappingURL=type.d.ts.map