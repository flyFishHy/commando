export class MiddlewarePool {
    prev = [];
    post = [];
    use(mw, position) {
        if (position === 'post') {
            this.post.push(mw);
            return;
        }
        this.prev.push(mw);
    }
    execute(cmd, ctx, core) {
        const postWrappers = this.post.map((postMw) => {
            return async (c, context, next) => {
                const res = await next();
                return postMw(c, context, async () => res);
            };
        });
        const handlerWrapper = async () => {
            return core();
        };
        const chain = [...postWrappers, ...this.prev, handlerWrapper];
        let lastIndex = -1;
        const dispatch = (index) => {
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
            }
            catch (err) {
                return Promise.reject(err);
            }
        };
        return dispatch(0);
    }
    dispose() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=middleware-pool.js.map