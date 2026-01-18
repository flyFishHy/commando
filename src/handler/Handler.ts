import { IHandler, IHandlerDef } from '@/types/type';

export class Handler implements IHandler {
  private handlers = new Map<string, IHandlerDef>();
  register(hl: IHandlerDef): void {
    if (this.handlers.has(hl.name)) {
      throw new Error(`Handler with name ${hl.name} already exists`);
    }

    this.handlers.set(hl.name, hl);
  }
}
