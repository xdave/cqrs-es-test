import { Observable } from 'rxjs';
import { ICommand } from './command.interface';

export interface ICommandHandler<T extends ICommand, R = any> {
  execute(command: T): void | R | Promise<R> | Observable<R>;
}
