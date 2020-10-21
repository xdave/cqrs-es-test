import { Connection, IDatabaseDriver } from '@mikro-orm/core';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PostgresConfigService } from '../postgres-config/postgres-config.service';

@Injectable()
export class MikroOrmConfigService implements MikroOrmOptionsFactory {
  constructor(private readonly postgresConfig: PostgresConfigService) {}

  createMikroOrmOptions(): MikroOrmModuleOptions<IDatabaseDriver<Connection>> {
    const { host, port, user, password, dbName } = this.postgresConfig;
    return {
      type: 'postgresql',
      autoLoadEntities: true,
      debug: true,
      host,
      port,
      user,
      password,
      dbName,
    };
  }
}
