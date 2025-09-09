import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigService } from 'src/config/database/postgres/config.service';
import { PostgresConfigModule } from 'src/config/database/postgres/config.module';
import { User } from 'src/models/users/entities/user.entity';
import { Trip } from 'src/models/trips/entities/trip.entity';
import { Destination } from 'src/models/destinations/entities/destination.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useFactory: (postgresConfigService: PostgresConfigService) => ({
        type: 'postgres' as DatabaseType,
        host: postgresConfigService.host,
        port: postgresConfigService.port,
        username: postgresConfigService.user,
        password: postgresConfigService.pass,
        database: postgresConfigService.name,
        entities: [User, Trip, Destination],
        synchronize: true, //* Only use for dev environment
      }),
      inject: [PostgresConfigService],
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgreSQLDatabaseProviderModule {}
