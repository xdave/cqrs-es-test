import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv-safe';

dotenv.config();

@Injectable()
export class ConfigService {
  get(key: string): string {
    return process.env[key] as string;
  }
}
