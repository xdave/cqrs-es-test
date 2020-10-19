import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule],
})
export class AuthModule {}
