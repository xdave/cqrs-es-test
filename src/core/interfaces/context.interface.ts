import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { v4 } from "uuid";
import { createTimestamp } from "../utils/timestamp.util";

export abstract class IContext {
  @IsUUID("4") id = v4();
  @IsUUID("4") correlationId = this.id;
  @IsUUID("4") causationId = this.id;
  @IsNumber() timestamp = createTimestamp();
  @IsString() @IsOptional() hostname!: string;
  @IsString() @IsOptional() clientIp!: string;

  static copy<T extends IContext>(
    source: Partial<IContext>,
    destination: T
  ): T {
    return Object.assign(destination, {
      correlationId: source.correlationId ?? destination.correlationId,
      causationId: source.id ?? destination.causationId,
      hostname: source.hostname ?? destination.hostname,
      clientIp: source.clientIp ?? destination.clientIp,
    });
  }
}
