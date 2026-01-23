import { ICommandDef, IExecutorContextDef, TMiddlewareFn, TNextFn } from '@/types/type';
export interface IMiddlewarePool {
    use(mw: TMiddlewareFn, position?: 'prev' | 'post'): void;
    execute(cmd: ICommandDef<unknown>, ctx: IExecutorContextDef, next: () => Promise<unknown>): Promise<unknown>;
    dispose?(): void;
}
export declare class MiddlewarePool implements IMiddlewarePool {
    private prev;
    private post;
    use(mw: TMiddlewareFn, position?: 'prev' | 'post'): void;
    execute(cmd: ICommandDef<unknown>, ctx: IExecutorContextDef, core: TNextFn): Promise<unknown>;
    dispose?(): void;
}
//# sourceMappingURL=middleware-pool.d.ts.map