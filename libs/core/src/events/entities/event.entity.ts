import { IEvent } from '@app/core/interfaces/event.interface';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Type } from '@nestjs/common';
import { EventRegistry } from '../event-registry/event.registry';

export interface IEventEntity<T> {
  id: string;
  correlationId: string;
  causationId: string;
  aggregateId: string;
  name: string;
  timestamp: number;
  payload: T;
  hostname: string;
  clientIp: string;
}

@Entity({ tableName: 'events' })
export class EventEntity<T> implements IEventEntity<T> {
  @PrimaryKey({ columnType: 'uuid' }) id: string;
  @Property({ columnType: 'uuid' }) correlationId: string;
  @Property({ columnType: 'uuid' }) causationId: string;
  @Property({ columnType: 'uuid' }) aggregateId: string;
  @Property() name: string;
  @Property({ columnType: 'numeric' }) timestamp: number;
  @Property({ columnType: 'jsonb' }) payload: T;
  @Property() hostname: string;
  @Property() clientIp: string;

  constructor(props: IEventEntity<T>) {
    this.id = props?.id;
    this.correlationId = props?.correlationId;
    this.causationId = props?.causationId;
    this.aggregateId = props?.aggregateId;
    this.name = props?.name;
    this.timestamp = props?.timestamp;
    this.payload = props?.payload;
    this.hostname = props?.hostname;
    this.clientIp = props?.clientIp;
  }

  static fromEvent<T>(event: IEvent<T>): EventEntity<T> {
    return new EventEntity({
      id: event.id,
      correlationId: event.correlationId,
      causationId: event.causationId,
      aggregateId: event.aggregateId,
      name: event.name,
      timestamp: event.timestamp,
      payload: event.payload,
      hostname: event.hostname,
      clientIp: event.clientIp,
    });
  }

  toEvent<T extends IEvent<T>>(): T {
    const Event = EventRegistry.lookup<Type<T>>(this.name);
    return Object.assign(new Event(), {
      id: this.id,
      correlationId: this.correlationId,
      causationId: this.causationId,
      aggregateId: this.aggregateId,
      name: this.name,
      timestamp: this.timestamp,
      payload: this.payload,
      hostname: this.hostname,
      clientIp: this.clientIp,
    });
  }
}
