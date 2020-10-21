import { IEventRepository } from '@app/core/events/repository/event.repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly eventRepo: IEventRepository) {}

  async findById(userId: string): Promise<User> {
    return new User().loadFromHistory(
      await this.eventRepo.loadHistoryByAggregateId(userId),
    );
  }

  async save(user: User): Promise<void> {
    await this.eventRepo.publishAll(user.getUncommittedEvents());
  }
}
