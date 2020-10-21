import { RegisterEvent } from '@app/core/events/event-registry/event.registry';
import { IEvent } from '@app/core/interfaces/event.interface';

export interface IUserCreated {
  name: string;
  email: string;
}

@RegisterEvent()
export class UserCreated extends IEvent<IUserCreated> {}
