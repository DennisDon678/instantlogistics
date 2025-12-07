import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function ensureAdmin() {
    console.log('Ensuring admin user exists...');

    const username = 'admin';
    const email = 'admin@example.com';
    const password = 'admin123';
    const name = 'Admin User';

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingAdmin = await prisma.admin.findUnique({
            where: { username },
        });

        if (existingAdmin) {
            console.log('Admin user exists. Updating password...');
            await prisma.admin.update({
                where: { username },
                data: { password: hashedPassword },
            });
            console.log('Password updated.');
        } else {
            console.log('Admin user does not exist. Creating...');
            await prisma.admin.create({
                data: {
                    username,
                    email,
                    name,
                    password: hashedPassword,
                },
            });
            console.log('Admin user created.');
        }
    } catch (error) {
        console.error('Error ensuring admin:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

ensureAdmin();
