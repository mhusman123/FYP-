#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🎓 Setting up EduPlatform database...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envLocalPath = path.join(__dirname, '..', '.env.local');
const activeEnvPath = fs.existsSync(envPath) ? envPath : (fs.existsSync(envLocalPath) ? envLocalPath : null);

if (!activeEnvPath) {
  console.log('❌ No .env file found. Please create .env or .env.local');
  process.exit(1);
}

// Read current .env to check database provider
const envContent = fs.readFileSync(activeEnvPath, 'utf8');
const databaseProvider = envContent.match(/DATABASE_PROVIDER="?([^"\n]+)"?/)?.[1] || 'sqlite';

console.log(`📊 Using ${databaseProvider.toUpperCase()} database`);

try {
  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  if (databaseProvider === 'sqlite') {
    // For SQLite, use db push to create the database
    console.log('📋 Creating SQLite database schema...');
    execSync('npx prisma db push', { stdio: 'inherit' });
  } else {
    // For PostgreSQL, use migrations
    console.log('📋 Running database migrations...');
    try {
      execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️  Migration failed, trying db push instead...');
      execSync('npx prisma db push', { stdio: 'inherit' });
    }
  }

  // Seed the database
  console.log('🌱 Seeding database with sample data...');
  execSync('npx prisma db seed', { stdio: 'inherit' });

  console.log('\n✅ Database setup complete!');
  console.log('\n🚀 Quick start:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Visit: http://localhost:3000');
  console.log('   3. Use test accounts:');
  console.log('      - Student: student@eduplatform.edu');
  console.log('      - Educator: educator@eduplatform.edu');
  console.log('\n📊 View your data: npx prisma studio');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('   1. Check your .env configuration');
  console.log('   2. Ensure database is running (if using PostgreSQL)');
  console.log('   3. Run: npm install');
  process.exit(1);
}