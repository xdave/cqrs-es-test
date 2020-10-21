import { Observable } from 'rxjs';
import { ICommand } from './command.interface';

export interface ICommandHandler<T extends ICommand, R = void> {
  execute(command: T): R | Promise<R> | Observable<R>;
}
