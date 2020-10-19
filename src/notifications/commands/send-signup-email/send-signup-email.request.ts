import { IsEmail, IsString, IsUUID } from "class-validator";

export class SendSignupEmailRequest {
  @IsUUID("4") userId: string;
  @IsString() name: string;
  @IsEmail() email: string;

  constructor(props: SendSignupEmailRequest) {
    this.userId = props?.userId;
    this.name = props?.name;
    this.email = props?.email;
  }
}
