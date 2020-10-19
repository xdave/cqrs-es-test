import { IsEmail, IsString } from "class-validator";
import { v4 } from "uuid";

export class CreateUserRequest {
  id: string;
  @IsString() name: string;
  @IsEmail() email: string;

  constructor(props: CreateUserRequest) {
    this.id = v4();
    this.name = props?.name;
    this.email = props?.email;
  }
}
