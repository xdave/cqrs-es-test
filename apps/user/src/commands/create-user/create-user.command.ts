import { ICommand } from '@app/core/interfaces/command.interface';
import { CreateUserRequest } from './create-user.request';

export class CreateUser extends ICommand<CreateUserRequest> {}
