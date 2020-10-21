import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { ChangeUserNameHandler } from './commands/change-user-name/change-user-name.handler';
import { CreateUserHandler } from './commands/create-user/create-user.handler';
import { CreateUserProcess } from './commands/create-user/create-user.process';
import { UserRepository } from './repository/user.repository.impl';
import { IUserRepository } from './repository/user.repository.interface';

const UserRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository,
};

@Module({
  imports: [CoreModule],
  controllers: [CreateUserHandler, ChangeUserNameHandler],
  providers: [UserRepositoryProvider, CreateUserProcess],
})
export class UserModule {}
