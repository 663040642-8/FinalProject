import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { roleProviders } from './roles.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [RolesService, ...roleProviders],
  exports: [RolesService],
})
export class RolesModule { }
