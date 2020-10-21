import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { NatsClient } from './client/nats.client';
import { NatsClientStatic } from './client/nats.client.static';
import { ConfigModule } from './config/config.module';
import { MikroOrmConfigService } from './config/mikro-orm-config/mikro-orm-config.service';
import { EventEntity } from './events/entities/event.entity';
import { EventBus } from './events/event-bus/event.bus';
import { EventConsumer } from './events/event-bus/event.consumer';
import { IEventRepository } from './events/repository/event.repository.interface';
import { MikroOrmEventRepository } from './events/repository/event.repository.mikro-orm';
import { IClient, IClientStatic } from './interfaces/client.interface';

const MikroOrmRepositories = MikroOrmModule.forFeature([EventEntity]);

@Global()
@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MikroOrmConfigService,
    }),
    MikroOrmRepositories,
  ],
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
    { provide: IClientStatic, useClass: NatsClientStatic },
    { provide: IClient, useClass: NatsClient },
    { provide: IEventRepository, useClass: MikroOrmEventRepository },
    EventBus,
  ],
  controllers: [EventConsumer],
  exports: [IClientStatic, IClient, IEventRepository, MikroOrmRepositories],
})
export class CoreModule {}
