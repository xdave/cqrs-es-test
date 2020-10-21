import { Injectable } from '@nestjs/common';
import { NatsOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '../config.service';

@Injectable()
export class NatsConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get('NATS_SERVICE_HOST');
  }

  get port(): number {
    return +this.configService.get('NATS_SERVICE_PORT');
  }

  get url(): string {
    return `nats://${this.host}:${this.port}`;
  }

  createOptions(queue?: string): NatsOptions {
    return {
      transport: Transport.NATS,
      options: {
        url: this.url,
        queue,
      },
    };
  }

  static createOptions(queue?: string): NatsOptions {
    const natsConfig = new NatsConfigService(new ConfigService());
    return natsConfig.createOptions(queue);
  }
}
