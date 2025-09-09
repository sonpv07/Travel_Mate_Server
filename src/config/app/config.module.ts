import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration, { appConfigValidationSchema } from './configuration';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: appConfigValidationSchema,
      isGlobal: false,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
