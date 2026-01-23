import { ICommand, ICommando, IHandlerDef, IPluginDef, TMiddlewareFn } from '@/types/type';
export declare class Commando implements ICommando {
    private context;
    private plugin;
    private middleware;
    private handler;
    private queue;
    private executor;
    usePlugin(plugin: IPluginDef): void;
    useMiddleware(middleware: TMiddlewareFn, position?: 'prev' | 'post'): void;
    registerHandler<P, R>(handler: IHandlerDef<P, R>): void;
    execute<P, R>(cmd: ICommand<P>): Promise<R>;
    provide(key: string, val: unknown): void;
}
//# sourceMappingURL=Commando.d.ts.map