import { NatsConfigService } from '@app/core/config/nats-config/nats-config.service';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice(
    UserModule,
    NatsConfigService.createOptions('user'),
  );
  await app.listenAsync();
};

bootstrap().catch((err) => console.log(err));
