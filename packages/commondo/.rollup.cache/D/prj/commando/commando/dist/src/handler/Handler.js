export class Handler {
    handlers = new Map();
    register(hl) {
        if (this.handlers.has(hl.name)) {
            throw new Error(`Handler with name ${hl.name} already exists`);
        }
        this.handlers.set(hl.name, hl);
    }
    get(name) {
        return this.handlers.get(name);
    }
    dispose(name) {
        const hl = this.handlers.get(name);
        if (hl) {
            if (hl.dispose) {
                hl.dispose();
            }
            this.handlers.delete(name);
        }
    }
}
//# sourceMappingURL=Handler.js.map