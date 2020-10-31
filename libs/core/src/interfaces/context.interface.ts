import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { createTimestamp } from '../utils/timestamp.util';

export interface IContext {
  id: string;
  correlationId: string;
  causationId: string;
  timestamp: number;
  hostname: string;
  clientIp: string;
}

export class Context implements IContext {
  @IsUUID('4') id = v4();
  @IsUUID('4') correlationId = this.id;
  @IsUUID('4') causationId = this.id;
  @IsNumber() timestamp = createTimestamp();
  @IsString() @IsOptional() hostname!: string;
  @IsString() @IsOptional() clientIp!: string;

  constructor(props?: IContext) {
    if (props) {
      this.id = props.id;
      this.correlationId = props.correlationId;
      this.causationId = props.causationId;
      this.timestamp = props.timestamp;
      this.hostname = props.hostname;
      this.clientIp = props.clientIp;
    }
  }

  static copy<T extends Context>(source: Partial<Context>, destination: T): T {
    return Object.assign(destination, {
      correlationId: source.correlationId ?? destination.correlationId,
      causationId: source.id ?? destination.causationId,
      hostname: source.hostname ?? destination.hostname,
      clientIp: source.clientIp ?? destination.clientIp,
    });
  }
}
