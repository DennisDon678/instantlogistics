# Supabase + Prisma Setup Instructions

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: instant-logistics (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
5. Click "Create new project" and wait for setup to complete

## Step 2: Get Database Connection Strings

1. In your Supabase project dashboard, go to:
   **Project Settings** (gear icon) → **Database**

2. Scroll down to **Connection string** section

3. Select **URI** tab and copy the connection string

4. You'll see something like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

## Step 3: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)

2. Add these two lines (replace placeholders with your actual values):

```env
# Connection pooling URL (for Prisma Client)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"

# Direct connection URL (for migrations)
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**Important**: 
- Replace `[YOUR-PASSWORD]` with your database password
- Replace `[YOUR-PROJECT-REF]` with your project reference (found in connection string)
- Port 6543 is for pooled connections (DATABASE_URL)
- Port 5432 is for direct connections (DIRECT_URL)

## Step 4: Push Schema to Database

Run this command to create tables in your Supabase database:

```bash
npx prisma db push
```

This will create the `deliveries`, `delivery_history`, and `site_settings` tables.

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

This generates the TypeScript types for your database.

## Step 6: Verify Setup

Open Prisma Studio to view your database:

```bash
npx prisma studio
```

This opens a browser interface at `http://localhost:5555` where you can see your tables.

## Troubleshooting

### Connection Error
- Double-check your password and project reference
- Ensure you're using the correct ports (6543 for pooled, 5432 for direct)
- Check if your IP is allowed (Supabase allows all by default)

### Schema Push Fails
- Make sure DIRECT_URL is set correctly
- Verify your database password is correct

## Next Steps

Once setup is complete, you can:
1. Create API routes to interact with the database
2. Seed initial data
3. Connect frontend forms to the backend
