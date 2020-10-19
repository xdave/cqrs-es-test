import { IAction } from './action.interface';

export abstract class ICommand<T = any> extends IAction<T> {}
