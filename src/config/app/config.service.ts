import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configuration';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get appConfig(): AppConfig {
    return this.configService.get<AppConfig>('app');
  }

  get host(): string {
    return this.appConfig.host;
  }

  get port(): number {
    return this.appConfig.port;
  }
}
