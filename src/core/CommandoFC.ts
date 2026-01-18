// CommandoFactory.ts - 工厂方法：创建 Commando（或返回配置好的 Commando 实例）
import Commando from './Commando'; // 你的 Commando，需要略作改造（见下）
import { createSimpleSelector } from './QueueSelector';

export function createCommandoWithQueueStrategy(opts?: {
  concurrency?: number;
}) {
  const { selector, serial, concurrent } = createSimpleSelector(
    opts?.concurrency ?? 4
  );

  // 你可以在这里做更多配置（例如把 serial/concurrent 传入 commando 方便外部监控）
  const commando = new Commando({ queueSelector: selector });
  // 暴露一下队列以便监控/清理（可选）
  return { commando, selector, serial, concurrent };
}
