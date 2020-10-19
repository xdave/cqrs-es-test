import { Module } from "@nestjs/common";
import { CoreModule } from "src/core/core.module";
import { SendSignupEmailHandler } from "./commands/send-signup-email/send-signup-email.handler";

@Module({
  imports: [CoreModule],
  controllers: [SendSignupEmailHandler],
})
export class NotificationsModule {}
