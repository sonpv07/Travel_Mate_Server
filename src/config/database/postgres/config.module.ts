import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { postgresConfigValidationSchema } from './configuration';
import { PostgresConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: postgresConfigValidationSchema,
      isGlobal: false,
    }),
  ],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
