import { RegisterEvent } from '@app/core/events/event-registry/event.registry';
import { IEvent } from '@app/core/interfaces/event.interface';

export interface IUserNameChanged {
  newName: string;
}

@RegisterEvent()
export class UserNameChanged extends IEvent<IUserNameChanged> {}
