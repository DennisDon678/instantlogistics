import { prisma } from '../lib/prisma';

async function testConnection() {
    try {
        console.log('Testing database connection...');

        // Try to query the admin table
        const admins = await prisma.admin.findMany();
        console.log('✅ Database connection successful!');
        console.log(`Found ${admins.length} admin(s) in database`);

        if (admins.length > 0) {
            console.log('\nAdmin users:');
            admins.forEach((admin) => {
                console.log(`  - ${admin.username} (${admin.email})`);
            });
        }
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
