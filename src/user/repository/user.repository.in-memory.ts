import { Injectable } from "@nestjs/common";
import { IEventRepository } from "src/core/events/repository/event.repository.interface";
import { User } from "../models/user.model";
import { IUserRepository } from "./user.repository.interface";

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  constructor(private readonly eventRepo: IEventRepository) {}

  findById(userId: string): User {
    const user = new User();
    return user.loadFromHistory(
      this.eventRepo.loadHistoryByAggregateId(userId)
    );
  }

  save(user: User): void {
    this.eventRepo.publishAll(user.getUncommittedEvents());
  }
}
