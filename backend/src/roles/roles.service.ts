import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService implements OnModuleInit {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) { }

    async findByName(name: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({ where: { name } });
        if (!role) throw new Error(`Role ${name} not found`);
        return role;
    }

    async createDefaultRoles() {
        const roles = ['admin', 'user', 'guest'];
        for (const name of roles) {
            const exist = await this.rolesRepository.findOne({ where: { name } });
            if (!exist) await this.rolesRepository.save(this.rolesRepository.create({ name }));
        }
    }

    async onModuleInit() {
        await this.createDefaultRoles();
    }
}
