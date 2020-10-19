import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { CoreModule } from "./core/core.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [CoreModule, UserModule, NotificationsModule],

  controllers: [AppController],
})
export class AppModule {}
