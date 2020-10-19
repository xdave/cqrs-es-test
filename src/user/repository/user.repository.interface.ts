import { User } from "../models/user.model";

export abstract class IUserRepository {
  abstract findById(userId: string): User;
  abstract save(user: User): void;
}
