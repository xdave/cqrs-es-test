import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { IEvent } from '../interfaces/event.interface';
import { EventBus } from './event-bus';

@Controller()
export class EventConsumer {
  constructor(private readonly eventBus: EventBus) {}

  @EventPattern('event')
  onEvent(@Payload() event: IEvent): void {
    this.eventBus.processEvent(event);
  }
}
