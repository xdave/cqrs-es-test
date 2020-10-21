import { User } from '../models/user.model';

export abstract class IUserRepository {
  abstract findById(userId: string): Promise<User>;
  abstract save(user: User): Promise<void>;
}
