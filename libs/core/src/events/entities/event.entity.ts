import { Context, IContext } from '@app/core/interfaces/context.interface';
import { IEvent } from '@app/core/interfaces/event.interface';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Type } from '@nestjs/common';
import { EventRegistry } from '../event-registry/event.registry';

export interface IEventEntity<T> {
  id: string;
  aggregateId: string;
  name: string;
  context: IContext;
  payload: T;
  timestamp: number;
}

@Entity({ tableName: 'events' })
export class EventEntity<T> implements IEventEntity<T> {
  @PrimaryKey({ columnType: 'uuid' }) id: string;
  @Property({ columnType: 'uuid' }) aggregateId: string;
  @Property() name: string;
  @Property({ columnType: 'jsonb' }) context: IContext;
  @Property({ columnType: 'jsonb' }) payload: T;
  @Property({ columnType: 'numeric' }) timestamp: number;

  constructor(props: IEventEntity<T>) {
    this.id = props?.id;
    this.aggregateId = props?.aggregateId;
    this.name = props?.name;
    this.context = {
      id: props?.context.id,
      correlationId: props?.context.correlationId,
      causationId: props?.context.causationId,
      timestamp: props?.context.timestamp,
      hostname: props?.context.hostname,
      clientIp: props?.context.clientIp,
    };
    this.payload = props?.payload;
    this.timestamp = props?.timestamp;
  }

  static fromEvent<T>(event: IEvent<T>): EventEntity<T> {
    return new EventEntity({
      id: event.id,
      aggregateId: event.aggregateId,
      name: event.name,
      context: event.context,
      payload: event.payload,
      timestamp: event.timestamp,
    });
  }

  toEvent<T extends IEvent<T>>(): T {
    const Event = EventRegistry.lookup<Type<T>>(this.name);
    return Object.assign(new Event(), {
      id: this.id,
      aggregateId: this.aggregateId,
      name: this.name,
      context: new Context(this.context),
      payload: this.payload,
      timestamp: this.timestamp,
    });
  }
}
