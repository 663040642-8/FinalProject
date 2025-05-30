import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'mysql'>('DB_TYPE') ?? 'mysql',
        host: config.get<string>('DB_HOST') ?? 'localhost',
        port: parseInt(config.get<string>('DB_PORT') ?? '3306', 10),
        username: config.get<string>('DB_USERNAME') ?? 'root',
        password: config.get<string>('DB_PASSWORD') ?? '',
        database: config.get<string>('DB_NAME') ?? 'test',
        entities: [User, Role],
        synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
      }),
    }),
  ],
})
export class DatabaseModule {}
