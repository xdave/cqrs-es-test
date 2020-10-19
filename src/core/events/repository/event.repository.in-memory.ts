import { Injectable } from "@nestjs/common";
import { IClient } from "src/core/interfaces/client.interface";
import { IEvent } from "src/core/interfaces/event.interface";
import { IEventRepository } from "./event.repository.interface";

@Injectable()
export class InMemoryEventRepository implements IEventRepository {
  // EXAMPLE ONLY: this event persistence does not scale, use a real database
  // or EventStore or whatever.
  static EVENTS: IEvent[] = [];

  constructor(private readonly client: IClient) {}

  publishAll(events: IEvent<any>[]): void {
    InMemoryEventRepository.EVENTS.push(...events);
    events.forEach((event) => this.client.publish(event));
  }

  loadHistoryByAggregateId(aggregateId: string): IEvent[] {
    return InMemoryEventRepository.EVENTS.filter(
      (event) => event.aggregateId === aggregateId
    ).sort((a, b) => a.timestamp - b.timestamp);
  }
}
