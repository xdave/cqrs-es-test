import { ICommandHandler } from '@app/core/interfaces/command-handler.interface';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendSignupEmail } from './send-signup-email.command';

@Controller()
export class SendSignupEmailHandler
  implements ICommandHandler<SendSignupEmail, void> {
  @MessagePattern(SendSignupEmail.name)
  execute(@Payload() command: SendSignupEmail): void {
    const { userId, name } = command.payload;

    // EXAMPLE: email message sent when users signup
    const registerUrl = `http://foo.bar/register/${userId}`;
    const message =
      `Dear ${name}, welcome! ` +
      `Please click here to create your password: ${registerUrl}`;

    console.log(message);
  }
}
