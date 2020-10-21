import { IClient } from '@app/core/interfaces/client.interface';
import { IEvent } from '@app/core/interfaces/event.interface';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EventEntity } from '../entities/event.entity';
import { IEventRepository } from './event.repository.interface';

/**
 * TODO: Snapshots, offsets
 */
@Injectable()
export class MikroOrmEventRepository implements IEventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repo: EntityRepository<EventEntity<any>>,
    private readonly client: IClient,
  ) {}

  async publishAll(events: IEvent<any>[]): Promise<void> {
    await this.repo.persistAndFlush(events.map(EventEntity.fromEvent));
    events.forEach((event) => this.client.publish(event));
  }

  async loadHistoryByAggregateId(aggregateId: string): Promise<IEvent[]> {
    const events = await this.repo.find(
      { aggregateId },
      { orderBy: { timestamp: 'asc' } },
    );
    return events.map((event) => event.toEvent());
  }
}
