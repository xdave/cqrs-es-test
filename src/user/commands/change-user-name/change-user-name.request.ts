import { IsString, IsUUID } from "class-validator";

export class ChangeUserNameRequest {
  @IsUUID("4") userId: string;
  @IsString() newName: string;

  constructor(props: ChangeUserNameRequest) {
    this.userId = props?.userId;
    this.newName = props?.newName;
  }
}
