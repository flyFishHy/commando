import { IHandler, IHandlerDef } from '@/types/type';

export class Handler implements IHandler {
  private handlers = new Map<string, IHandlerDef>();
  register(hl: IHandlerDef): void {
    if (this.handlers.has(hl.name)) {
      throw new Error(`Handler with name ${hl.name} already exists`);
    }

    this.handlers.set(hl.name, hl);
  }

  get(name: string): IHandlerDef | undefined {
    return this.handlers.get(name);
  }

  dispose(name: string): void {
    const hl = this.handlers.get(name);
    if (hl) {
      if (hl.dispose) {
        hl.dispose();
      }
      this.handlers.delete(name);
    }
  }
}
