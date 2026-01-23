import {
  ICommandDef,
  IExecutorContextDef,
  TMiddlewareFn,
  TNextFn,
} from '@/types/type';

export interface IMiddlewarePool {
  use(mw: TMiddlewareFn, position?: 'prev' | 'post'): void;
  execute(
    cmd: ICommandDef<unknown>,
    ctx: IExecutorContextDef,
    next: () => Promise<unknown>
  ): Promise<unknown>;
  dispose?(): void;
}

export class MiddlewarePool implements IMiddlewarePool {
  private prev: TMiddlewareFn[] = [];
  private post: TMiddlewareFn[] = [];

  use(mw: TMiddlewareFn, position?: 'prev' | 'post'): void {
    if (position === 'post') {
      this.post.push(mw);
      return;
    }

    this.prev.push(mw);
  }

  execute(
    cmd: ICommandDef<unknown>,
    ctx: IExecutorContextDef,
    core: TNextFn
  ): Promise<unknown> {
    const postWrappers: TMiddlewareFn[] = this.post.map((postMw) => {
      return async (c, context, next) => {
        const res = await next();
        return postMw(c, context, async () => res);
      };
    });

    const handlerWrapper: TMiddlewareFn = async () => {
      return core();
    };

    const chain = [...postWrappers, ...this.prev, handlerWrapper];

    let lastIndex = -1;
    const dispatch = (index: number): Promise<unknown> => {
      if (index <= lastIndex) {
        return Promise.reject(new Error('next() called multiple times'));
      }
      lastIndex = index;
      if (index >= chain.length) {
        return Promise.resolve();
      }
      const mw = chain[index];
      try {
        return Promise.resolve(mw(cmd, ctx, () => dispatch(index + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    };

    return dispatch(0);
  }

  dispose?(): void {
    throw new Error('Method not implemented.');
  }
}
