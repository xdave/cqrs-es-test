import { CoreModule } from '@app/core/core.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
})
export class AppModule {}
