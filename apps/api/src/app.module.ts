import { CoreModule } from '@app/core/core.module';
import { MikroORM } from '@mikro-orm/core';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly orm: MikroORM) {}
  async onApplicationBootstrap() {
    const schemaGenerator = this.orm.getSchemaGenerator();
    try {
      await schemaGenerator.createSchema();
    } catch (err) {
      // probably already exists, carry on
    }
  }
}
