import { Observable } from 'rxjs';
import { IAction } from './action.interface';
import { Context } from './context.interface';
import { IEvent } from './event.interface';

export abstract class IClientStatic {
  abstract execute<R = void>(
    action: IAction,
    reason?: Partial<Context>,
  ): Observable<R>;
  abstract publish(event: IEvent): void;
}

export abstract class IClient extends IClientStatic {}
