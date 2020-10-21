import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config.service';

@Injectable()
export class PostgresConfigService {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.get(`POSTGRES_SERVICE_HOST`);
  }

  get port(): number {
    return +this.configService.get(`POSTGRES_SERVICE_PORT`);
  }

  get user(): string {
    return this.configService.get(`POSTGRES_USER`);
  }

  get password(): string {
    return this.configService.get(`POSTGRES_PASSWORD`);
  }

  get dbName(): string {
    return this.configService.get(`POSTGRES_DB`);
  }
}
