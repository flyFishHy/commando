import { ICommand, IContext, IMiddleware, IMiddlewareDef } from '@/types/type';

export class Middleware implements IMiddleware {
  private mws = new Set<IMiddlewareDef>();
  use(mw: IMiddlewareDef): void {
    // Middleware initialization logic can go here
    if (this.mws.has(mw!)) {
      console.warn(`Middleware with name ${mw.name} already exists`);
    }
    this.mws.add(mw);
  }
  async execute(
    cmd: ICommand<unknown, unknown>,
    ctx: IContext,
    next: () => Promise<unknown>
  ): Promise<unknown> {
    const executeChain = Array.from(this.mws.values()).reduceRight(
      (nextFn, mw) => {
        return () => mw.execute(cmd, ctx, nextFn);
      },
      next
    );
    return executeChain();
  }
}
