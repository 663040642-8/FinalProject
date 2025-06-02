import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: config.get('DB_HOST') ?? 'localhost',
        port: parseInt(config.get('DB_PORT') ?? '3306'),
        username: config.get('DB_USERNAME') ?? 'root',
        password: config.get('DB_PASSWORD') ?? '',
        database: config.get('DB_NAME') ?? 'test',
        entities: [User, Role],
        synchronize: config.get('DB_SYNCHRONIZE') === 'true',
      });
      return dataSource.initialize();
    },
  },
];
