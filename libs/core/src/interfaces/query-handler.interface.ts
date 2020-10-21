import { Observable } from 'rxjs';
import { IQuery } from './query.interface';

export interface IQueryHandler<T extends IQuery, R = void> {
  execute(command: T): R | Promise<R> | Observable<R>;
}
