import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function createAdmin() {
    console.log('\n=== Create Admin User ===\n');

    try {
        // Get admin details
        const username = await question('Username: ');
        const email = await question('Email: ');
        const name = await question('Full Name: ');
        const password = await question('Password: ');

        // Validate input
        if (!username || !email || !name || !password) {
            console.error('\n❌ Error: All fields are required');
            process.exit(1);
        }

        // Check if username already exists
        const existingUsername = await prisma.admin.findUnique({
            where: { username },
        });

        if (existingUsername) {
            console.error('\n❌ Error: Username already exists');
            process.exit(1);
        }

        // Check if email already exists
        const existingEmail = await prisma.admin.findUnique({
            where: { email },
        });

        if (existingEmail) {
            console.error('\n❌ Error: Email already exists');
            process.exit(1);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await prisma.admin.create({
            data: {
                username,
                email,
                name,
                password: hashedPassword,
            },
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('\nDetails:');
        console.log(`  ID: ${admin.id}`);
        console.log(`  Username: ${admin.username}`);
        console.log(`  Email: ${admin.email}`);
        console.log(`  Name: ${admin.name}`);
        console.log('\nYou can now login at /admin/login\n');
    } catch (error) {
        console.error('\n❌ Error creating admin:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        rl.close();
    }
}

createAdmin();
