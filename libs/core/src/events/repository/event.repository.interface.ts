import { IEvent } from '@app/core/interfaces/event.interface';

export abstract class IEventRepository {
  abstract publishAll(events: IEvent[]): void;
  abstract loadHistoryByAggregateId(aggregateId: string): IEvent[];
}
