import { ICommand } from "src/core/interfaces/command.interface";
import { SendSignupEmailRequest } from "./send-signup-email.request";

export class SendSignupEmail extends ICommand<SendSignupEmailRequest> {}
