import { Context } from './context.interface';

export abstract class IAction<T = any> {
  name = this.constructor.name;
  context = new Context();
  id = this.context.id;
  timestamp = this.context.timestamp;
  constructor(readonly payload: T) {}
}
