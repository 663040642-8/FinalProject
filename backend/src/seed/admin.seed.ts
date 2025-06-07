import { DataSource } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';  // import Role
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource) {
    const userRepo = dataSource.getRepository(User);
    const roleRepo = dataSource.getRepository(Role);

    // หา Role 'admin' ใน DB
    const adminRole = await roleRepo.findOneBy({ name: 'admin' });
    if (!adminRole) {
        console.error('Admin role not found. Please create the admin role first.');
        return;
    }

    const existingAdmin = await userRepo.findOneBy({ email: 'admin@example.com' });
    if (existingAdmin) {
        console.log('Admin user already exists.');
        return;
    }

    const hashedPassword = await bcrypt.hash('admin', 10);

    const admin = userRepo.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: adminRole, 
        firstName: 'Admin',
        lastName: 'User',
    });

    await userRepo.save(admin);
    console.log('Admin user created.');
}
