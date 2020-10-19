import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices/decorators/message-pattern.decorator";
import { Payload } from "@nestjs/microservices/decorators/payload.decorator";
import { ICommandHandler } from "src/core/interfaces/command-handler.interface";
import { User } from "src/user/models/user.model";
import { IUserRepository } from "src/user/repository/user.repository.interface";
import { CreateUser } from "./create-user.command";

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
