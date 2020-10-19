import { IAction } from './action.interface';

export abstract class IEvent<T = any> extends IAction<T> {
  constructor(readonly aggregateId: string, payload: T) {
    super(payload);
  }
}
