import { IHandler, IHandlerDef } from '@/types/type';
export declare class Handler implements IHandler {
    private handlers;
    register(hl: IHandlerDef): void;
    get(name: string): IHandlerDef | undefined;
    dispose(name: string): void;
}
//# sourceMappingURL=Handler.d.ts.map