import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { MikroOrmConfigService } from './mikro-orm-config/mikro-orm-config.service';
import { NatsConfigService } from './nats-config/nats-config.service';
import { PostgresConfigService } from './postgres-config/postgres-config.service';

@Module({
  providers: [
    ConfigService,
    NatsConfigService,
    PostgresConfigService,
    MikroOrmConfigService,
  ],
  exports: [
    ConfigService,
    NatsConfigService,
    PostgresConfigService,
    MikroOrmConfigService,
  ],
})
export class ConfigModule {}
