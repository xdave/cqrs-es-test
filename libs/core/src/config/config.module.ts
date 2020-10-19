import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { NatsConfigService } from './nats-config/nats-config.service';

@Module({
  providers: [ConfigService, NatsConfigService],
  exports: [ConfigService, NatsConfigService],
})
export class ConfigModule {}
