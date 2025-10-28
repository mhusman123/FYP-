import { AiWrapperPlugin, PluginRegistrySnapshot } from '../types';

export class PluginRegistry implements PluginRegistrySnapshot {
  private readonly plugins = new Map<string, AiWrapperPlugin>();

  list(): AiWrapperPlugin[] {
    return Array.from(this.plugins.values());
  }

  get(id: string): AiWrapperPlugin | undefined {
    return this.plugins.get(id);
  }

  register(plugin: AiWrapperPlugin): void {
    if (this.plugins.has(plugin.id)) {
      throw new Error(`Plugin ${plugin.id} already registered`);
    }
    this.plugins.set(plugin.id, plugin);
    plugin.onRegister?.();
  }

  snapshot(): PluginRegistrySnapshot {
    return {
      list: () => this.list(),
      get: (id: string) => this.get(id),
    };
  }
}
