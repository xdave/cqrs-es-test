import { IEvent } from "src/core/interfaces/event.interface";

export interface IUserCreated {
  name: string;
  email: string;
}

export class UserCreated extends IEvent<IUserCreated> {}
