import {
  CommandHandler,
  EventHandler,
  IAggregateRoot,
} from '@app/core/interfaces/aggregate-root.interface';
import { ChangeUserName } from '../commands/change-user-name/change-user-name.command';
import { CreateUser } from '../commands/create-user/create-user.command';
import { UserCreated } from '../events/user-created.event';
import { UserNameChanged } from '../events/user-name-changed.event';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export class User extends IAggregateRoot<IUser> {
  @CommandHandler(CreateUser)
  create(command: CreateUser): void {
    const { id, name, email } = command.payload;
    this.apply(new UserCreated(id, { name, email }), command.context);
  }

  @CommandHandler(ChangeUserName)
  changeName(command: ChangeUserName): void {
    const { userId, newName } = command.payload;
    this.apply(new UserNameChanged(userId, { newName }), command.context);
  }

  @EventHandler(UserCreated)
  onCreated(event: UserCreated): Partial<IUser> {
    return {
      id: event.aggregateId,
      name: event.payload.name,
      email: event.payload.email,
    };
  }

  @EventHandler(UserNameChanged)
  onNameChanged(event: UserNameChanged): Partial<IUser> {
    return {
      name: event.payload.newName,
    };
  }
}
