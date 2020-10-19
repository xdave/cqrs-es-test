import { IEvent } from '@app/core/interfaces/event.interface';

export interface IUserNameChanged {
  newName: string;
}

export class UserNameChanged extends IEvent<IUserNameChanged> {}
