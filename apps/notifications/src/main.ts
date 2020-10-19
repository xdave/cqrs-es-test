import { NatsConfigService } from '@app/core/config/nats-config/nats-config.service';
import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice(
    NotificationsModule,
    NatsConfigService.createOptions('notifications'),
  );
  await app.listenAsync();
};

bootstrap().catch((err) => console.log(err));
