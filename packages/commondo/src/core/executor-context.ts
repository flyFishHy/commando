import { IdGenerator } from '@/shared/IdGenerator';
import { IExecutorContextDef } from '@/types/type';

export class ExecutorContext implements IExecutorContextDef {
  readonly id = IdGenerator.next('ExecutorContext');
  readonly traceId = IdGenerator.next('Trace');
  state = {};
  lastResult?: unknown;
  startAt?: number | undefined;
  envCtx?: Record<string, unknown> | undefined;

  constructor(opts: {
    state?: Record<string, unknown>;
    lastResult?: unknown;
    startAt?: number;
    envCtx?: Record<string, unknown>;
  }) {
    this.state = opts.state || {};
    this.lastResult = opts.lastResult;
    this.startAt = opts.startAt;
    this.envCtx = opts.envCtx;
  }
}
