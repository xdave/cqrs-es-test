import { Body, Controller, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { IClient } from "./core/interfaces/client.interface";
import { ChangeUserName } from "./user/commands/change-user-name/change-user-name.command";
import { ChangeUserNameRequest } from "./user/commands/change-user-name/change-user-name.request";
import { CreateUser } from "./user/commands/create-user/create-user.command";
import { CreateUserRequest } from "./user/commands/create-user/create-user.request";

@Controller("api/v1")
export class AppController {
  constructor(private readonly client: IClient) {}

  @Post("user")
  createUser(@Body() request: CreateUserRequest): Observable<string> {
    return this.client.execute<string>(new CreateUser(request));
  }

  @Post("user/changeName")
  changeUserName(@Body() request: ChangeUserNameRequest): Observable<void> {
    return this.client.execute<void>(new ChangeUserName(request));
  }
}
