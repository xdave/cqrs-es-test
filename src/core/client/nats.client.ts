import { Inject, Injectable } from "@nestjs/common";
import { IAction } from "../interfaces/action.interface";
import { IClient } from "../interfaces/client.interface";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { IContext } from "../interfaces/context.interface";
import { NatsClientStatic } from "./nats.client.static";

@Injectable()
export class NatsClient extends NatsClientStatic implements IClient {
  @Inject(REQUEST) req!: Request;

  execute(action: IAction, reason?: Partial<IContext>) {
    return super.execute(
      action,
      reason ?? {
        hostname: this.req?.hostname,
        clientIp: this.req?.ip,
      }
    );
  }
}
