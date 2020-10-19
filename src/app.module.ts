import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CoreModule } from "./core/core.module";
import { ChangeUserNameHandler } from "./user/commands/change-user-name/change-user-name.handler";
import { CreateUserHandler } from "./user/commands/create-user/create-user.handler";
import { InMemoryUserRepository } from "./user/repository/user.repository.in-memory";
import { IUserRepository } from "./user/repository/user.repository.interface";
import { NotificationsModule } from "./notifications/notifications.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [CoreModule, UserModule, NotificationsModule],

  controllers: [AppController],
})
export class AppModule {}
