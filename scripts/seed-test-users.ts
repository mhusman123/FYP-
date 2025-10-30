import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedTestUsers() {
  console.log('🌱 Seeding test users...')

  try {
    // Hash passwords
    const studentPassword = await bcrypt.hash('password', 10)
    const educatorPassword = await bcrypt.hash('password', 10)

    // Create test student
    const student = await prisma.user.upsert({
      where: { email: 'student@eduplatform.edu' },
      update: {},
      create: {
        email: 'student@eduplatform.edu',
        name: 'Test Student',
        password: studentPassword,
        role: 'STUDENT',
        image: '/placeholder-avatar.jpg',
        totalPoints: 150,
      },
    })
    console.log('✓ Created test student:', student.email)

    // Create test educator
    const educator = await prisma.user.upsert({
      where: { email: 'educator@eduplatform.edu' },
      update: {},
      create: {
        email: 'educator@eduplatform.edu',
        name: 'Test Educator',
        password: educatorPassword,
        role: 'EDUCATOR',
        image: '/placeholder-avatar.jpg',
      },
    })
    console.log('✓ Created test educator:', educator.email)

    console.log('\n✅ Test users seeded successfully!')
    console.log('\nYou can now login with:')
    console.log('  Student: student@eduplatform.edu / password')
    console.log('  Educator: educator@eduplatform.edu / password')
  } catch (error) {
    console.error('Error seeding test users:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedTestUsers()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
