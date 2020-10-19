import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices/enums/transport.enum";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(
    {
      transport: Transport.NATS,
      options: {
        url: `nats://nats:4222`,
        queue: "app", // load balancing for message delivery
      },
    },
    { inheritAppConfig: true }
  );
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
};

bootstrap().catch((err) => console.log(err));
