import { Observable } from "rxjs";
import { IQuery } from "./query.interface";

export interface IQueryHandler<T extends IQuery, R = any> {
  execute(query: T): void | R | Promise<R> | Observable<R>;
}
