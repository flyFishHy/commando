export class Plugin {
    plugins = new Map();
    use(plugin, commando) {
        if (this.plugins.has(plugin.name)) {
            throw new Error(`Plugin with name ${plugin.name} already exists`);
        }
        this.plugins.set(plugin.name, plugin);
        if (plugin.dependency) {
            for (const depName of plugin.dependency) {
                if (!this.plugins.has(depName)) {
                    throw new Error(`Dependency plugin ${depName} not found`);
                }
            }
        }
        plugin.setup(commando);
    }
}
//# sourceMappingURL=Plugin.js.map