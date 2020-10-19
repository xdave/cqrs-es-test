import { NatsConfigService } from '@app/core/config/nats-config/nats-config.service';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

const bootstrap = async () => {
  const app = await NestFactory.createMicroservice(
    AuthModule,
    NatsConfigService.createOptions('auth'),
  );
  await app.listenAsync();
};

bootstrap().catch((err) => console.log(err));
