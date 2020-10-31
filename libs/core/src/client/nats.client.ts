import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IAction } from '../interfaces/action.interface';
import { IClient } from '../interfaces/client.interface';
import { Context } from '../interfaces/context.interface';
import { NatsClientStatic } from './nats.client.static';

@Injectable()
export class NatsClient extends NatsClientStatic implements IClient {
  @Inject(REQUEST) req!: Request;

  execute<R = void>(action: IAction, reason?: Partial<Context>): Observable<R> {
    return super.execute(
      action,
      reason ?? {
        hostname: this.req?.hostname,
        clientIp: this.req?.ip,
      },
    );
  }
}
