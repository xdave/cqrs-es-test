import { performance } from 'perf_hooks';

export const createTimestamp = (): number =>
  performance.timeOrigin + performance.now();
