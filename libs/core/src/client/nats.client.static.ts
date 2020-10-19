import { Injectable } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices/client';
import { NatsConfigService } from '../config/nats-config/nats-config.service';
import { IAction } from '../interfaces/action.interface';
import { IClient } from '../interfaces/client.interface';
import { IContext } from '../interfaces/context.interface';
import { IEvent } from '../interfaces/event.interface';

/**
 * This Client is meant to be injected in Static contexts where it is not
 * possible to use the current "request", such as the saga/process manager.
 */
@Injectable()
export class NatsClientStatic implements IClient {
  client = ClientProxyFactory.create(NatsConfigService.createOptions());

  execute(action: IAction, reason?: Partial<IContext>) {
    if (reason) {
      IContext.copy(reason, action);
    }
    console.log(action);
    return this.client.send(action.name, action);
  }

  publish(event: IEvent): void {
    console.log(event);
    this.client.emit('event', event).subscribe();
  }
}
