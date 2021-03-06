import { IClient } from '@app/core/interfaces/client.interface';
import { IEvent } from '@app/core/interfaces/event.interface';
import { Injectable } from '@nestjs/common';
import { IEventRepository } from './event.repository.interface';

@Injectable()
export class InMemoryEventRepository implements IEventRepository {
  // EXAMPLE ONLY: this event persistence does not scale, use a real database
  // or EventStore or whatever.
  static EVENTS: IEvent[] = [];

  constructor(private readonly client: IClient) {}

  async publishAll(events: IEvent<any>[]): Promise<void> {
    InMemoryEventRepository.EVENTS.push(...events);
    events.forEach((event) => this.client.publish(event));
  }

  async loadHistoryByAggregateId(aggregateId: string): Promise<IEvent[]> {
    return InMemoryEventRepository.EVENTS.filter(
      (event) => event.aggregateId === aggregateId,
    ).sort((a, b) => a.timestamp - b.timestamp);
  }
}
