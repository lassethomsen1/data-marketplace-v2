import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'User',
      role: 'USER',
      password: await bcrypt.hash('user', 10),
    },
  });
  const admin = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin',
      role: 'ADMIN',
      password: await bcrypt.hash('admin', 10),
    },
  });
  console.log(user ? 'User created' : 'User already exists');
  console.log(admin ? 'admin created' : 'admin already exists');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
