import { Handler } from '@/handler/Handler';
import { MiddlewarePool } from '@/middleware/middleware-pool';
import { Plugin } from '@/plugin/Plugin';
import { SerialQueue } from '@/queue/serial-queue';
import { Executor } from './Executor';
export class Commando {
    context = {};
    plugin = new Plugin();
    middleware = new MiddlewarePool();
    handler = new Handler();
    queue = new SerialQueue();
    executor = new Executor({
        queue: this.queue,
        middleware: this.middleware,
        handler: this.handler,
    });
    usePlugin(plugin) {
        this.plugin.use(plugin, this);
    }
    useMiddleware(middleware, position) {
        this.middleware.use(middleware, position);
    }
    registerHandler(handler) {
        this.handler.register(handler);
    }
    execute(cmd) {
        return this.executor.execute(cmd, this.context);
    }
    provide(key, val) {
        this.context[key] = val;
    }
}
//# sourceMappingURL=Commando.js.map