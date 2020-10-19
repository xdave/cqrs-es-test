import { ofType, Step } from '@app/core/events/event-bus';
import { IEvent } from '@app/core/interfaces/event.interface';
import { SendSignupEmail } from '@app/notifications/commands/send-signup-email/send-signup-email.command';
import { SendSignupEmailRequest } from '@app/notifications/commands/send-signup-email/send-signup-email.request';
import { UserCreated } from '@app/user/events/user-created.event';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CreateUserProcess {
  @Step()
  sendSignupEmail = (event$: Observable<IEvent>) =>
    event$.pipe(
      ofType(UserCreated),
      map(
        (event) =>
          new SendSignupEmail(
            new SendSignupEmailRequest({
              userId: event.aggregateId,
              name: event.payload.name,
              email: event.payload.email,
            }),
          ),
      ),
    );
}
