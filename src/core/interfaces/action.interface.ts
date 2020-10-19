import { IContext } from "./context.interface";

export abstract class IAction<T = any> extends IContext {
  name = this.constructor.name;
  constructor(readonly payload: T) {
    super();
  }
}
