import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { ICommandHandler } from "src/core/interfaces/command-handler.interface";
import { IUserRepository } from "src/user/repository/user.repository.interface";
import { ChangeUserName } from "./change-user-name.command";

@Controller()
export class ChangeUserNameHandler
  implements ICommandHandler<ChangeUserName, void> {
  constructor(private readonly userRepo: IUserRepository) {}

  @MessagePattern(ChangeUserName.name)
  execute(@Payload() command: ChangeUserName): void {
    const user = this.userRepo.findById(command.payload.userId);
    user.execute(command);
    this.userRepo.save(user);
  }
}
