import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { SendSignupEmailHandler } from './commands/send-signup-email/send-signup-email.handler';

@Module({
  imports: [CoreModule],
  controllers: [SendSignupEmailHandler],
})
export class NotificationsModule {}
