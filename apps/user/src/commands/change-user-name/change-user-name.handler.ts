import { ICommandHandler } from '@app/core/interfaces/command-handler.interface';
import { IUserRepository } from '@app/user/repository/user.repository.interface';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChangeUserName } from './change-user-name.command';

@Controller()
export class ChangeUserNameHandler
  implements ICommandHandler<ChangeUserName, void> {
  constructor(private readonly userRepo: IUserRepository) {}

  @MessagePattern(ChangeUserName.name)
  async execute(@Payload() command: ChangeUserName): Promise<void> {
    const user = await this.userRepo.findById(command.payload.userId);
    user.execute(command);
    this.userRepo.save(user);
  }
}
