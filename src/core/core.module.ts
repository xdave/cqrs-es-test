import { Global, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { NatsClient } from "./client/nats.client";
import { NatsClientStatic } from "./client/nats.client.static";
import { EventBus } from "./events/event-bus";
import { EventConsumer } from "./events/event.consumer";
import { InMemoryEventRepository } from "./events/repository/event.repository.in-memory";
import { IEventRepository } from "./events/repository/event.repository.interface";
import { IClient, IClientStatic } from "./interfaces/client.interface";

@Global()
@Module({
  providers: [
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true }) },
    { provide: IClientStatic, useClass: NatsClientStatic },
    { provide: IClient, useClass: NatsClient },
    { provide: IEventRepository, useClass: InMemoryEventRepository },
    EventBus,
  ],
  controllers: [EventConsumer],
  exports: [IClientStatic, IClient, IEventRepository],
})
export class CoreModule {}
