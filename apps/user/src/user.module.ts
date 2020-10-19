import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { ChangeUserNameHandler } from './commands/change-user-name/change-user-name.handler';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { CreateUserProcess } from './commands/create-user/create-user.process';
import { InMemoryUserRepository } from './repository/user.repository.in-memory';
import { IUserRepository } from './repository/user.repository.interface';

const UserRepositoryProvider = {
  provide: IUserRepository,
  useClass: InMemoryUserRepository,
};

@Module({
  imports: [CoreModule],
  providers: [UserRepositoryProvider, CreateUserProcess],
  controllers: [CreateUserHandler, ChangeUserNameHandler],
})
export class UserModule {}
