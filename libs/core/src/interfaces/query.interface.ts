import { IAction } from './action.interface';

export abstract class IQuery<T = any> extends IAction<T> {}
