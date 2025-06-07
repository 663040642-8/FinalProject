import { AppDataSource } from '../data-source'; // หรือไฟล์ที่ตั้งค่า DataSource ของคุณ
import { seedAdmin } from './admin.seed';

async function runSeed() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized');
    await seedAdmin(AppDataSource);
    console.log('Seeding admin completed');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Seed failed', error);
  }
}

runSeed();
