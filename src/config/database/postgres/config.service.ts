import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConfig } from './configuration';

@Injectable()
export class PostgresConfigService {
  constructor(private configService: ConfigService) {}

  get postgresConfig(): PostgresConfig {
    return this.configService.get<PostgresConfig>('postgres');
  }

  get host(): string {
    return this.postgresConfig.host;
  }

  get port(): number {
    return this.postgresConfig.port;
  }

  get user(): string {
    return this.postgresConfig.user;
  }

  get pass(): string {
    return this.postgresConfig.pass;
  }

  get name(): string {
    return this.postgresConfig.name;
  }
}
