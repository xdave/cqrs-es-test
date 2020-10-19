import { ICommand } from '@app/core/interfaces/command.interface';
import { ChangeUserNameRequest } from './change-user-name.request';

export class ChangeUserName extends ICommand<ChangeUserNameRequest> {}
