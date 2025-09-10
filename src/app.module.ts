import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/app/config.service';
import { AppConfigModule } from './config/app/config.module';
import { ConfigModule } from '@nestjs/config';
import { PostgresConfigModule } from './config/database/postgres/config.module';
import { UserModule } from './models/users/users.module';
import { PostgreSQLDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './authentication/auth.module';
import { LocalStrategy } from './authentication/strategies/local.strategy';
import { JwtAccessTokenStrategy } from './authentication/strategies/jwt-access-token.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AppConfigModule,
    PostgresConfigModule,
    PostgreSQLDatabaseProviderModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: AllExceptionsFilter,
    },
    JwtAccessTokenStrategy,
    LocalStrategy,
  ],
})
export class AppModule {
  constructor(private appConfigService: AppConfigService) {
    console.log(
      `Application is running on port: ${this.appConfigService.port}`,
    );
  }
}
