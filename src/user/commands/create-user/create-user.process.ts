import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ofType, Step } from "src/core/events/event-bus";
import { IEvent } from "src/core/interfaces/event.interface";
import { SendSignupEmail } from "src/notifications/commands/send-signup-email/send-signup-email.command";
import { SendSignupEmailRequest } from "src/notifications/commands/send-signup-email/send-signup-email.request";
import { UserCreated } from "src/user/events/user-created.event";

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
            })
          )
      )
    );
}
