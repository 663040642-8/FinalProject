import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from 'src/roles/roles.module';
import { userProviders } from './users.providers';
import { roleProviders } from 'src/roles/roles.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    RolesModule, DatabaseModule
  ],
  providers: [UsersService, ...userProviders, ...roleProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
