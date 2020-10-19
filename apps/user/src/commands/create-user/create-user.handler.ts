import { ICommandHandler } from '@app/core/interfaces/command-handler.interface';
import { User } from '@app/user/models/user.model';
import { IUserRepository } from '@app/user/repository/user.repository.interface';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators/message-pattern.decorator';
import { Payload } from '@nestjs/microservices/decorators/payload.decorator';
import { CreateUser } from './create-user.command';

@Controller()
export class CreateUserHandler implements ICommandHandler<CreateUser, string> {
  constructor(private readonly userRepo: IUserRepository) {}

  @MessagePattern(CreateUser.name)
  execute(@Payload() command: CreateUser): string {
    const user = new User();
    user.execute(command);
    this.userRepo.save(user);
    return user.id;
  }
}
