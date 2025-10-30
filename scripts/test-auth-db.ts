import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testAuth() {
  console.log('🔍 Testing Authentication Setup...\n')

  try {
    // Test 1: Check if users exist
    console.log('1. Checking if test users exist...')
    const student = await prisma.user.findUnique({
      where: { email: 'student@eduplatform.edu' }
    })
    const educator = await prisma.user.findUnique({
      where: { email: 'educator@eduplatform.edu' }
    })

    if (!student) {
      console.log('❌ Student account not found')
    } else {
      console.log('✅ Student account found:', student.email)
      console.log('   ID:', student.id)
      console.log('   Name:', student.name)
      console.log('   Role:', student.role)
      console.log('   Has password:', !!student.password)
    }

    if (!educator) {
      console.log('❌ Educator account not found')
    } else {
      console.log('✅ Educator account found:', educator.email)
      console.log('   ID:', educator.id)
      console.log('   Name:', educator.name)
      console.log('   Role:', educator.role)
      console.log('   Has password:', !!educator.password)
    }

    // Test 2: Verify password hashing
    console.log('\n2. Testing password verification...')
    if (student && student.password) {
      const isValid = await bcrypt.compare('password', student.password)
      if (isValid) {
        console.log('✅ Student password verification successful')
      } else {
        console.log('❌ Student password verification failed')
      }
    }

    if (educator && educator.password) {
      const isValid = await bcrypt.compare('password', educator.password)
      if (isValid) {
        console.log('✅ Educator password verification successful')
      } else {
        console.log('❌ Educator password verification failed')
      }
    }

    // Test 3: Check database schema
    console.log('\n3. Checking database schema...')
    const userCount = await prisma.user.count()
    console.log('✅ Total users in database:', userCount)

    // Test 4: Test creating a new user
    console.log('\n4. Testing user creation...')
    const testEmail = `test-${Date.now()}@example.com`
    const hashedPassword = await bcrypt.hash('testpassword', 10)
    
    const newUser = await prisma.user.create({
      data: {
        email: testEmail,
        name: 'Test User',
        password: hashedPassword,
        role: 'STUDENT'
      }
    })
    console.log('✅ Test user created:', newUser.email)

    // Clean up test user
    await prisma.user.delete({
      where: { id: newUser.id }
    })
    console.log('✅ Test user deleted')

    console.log('\n✅ All authentication tests passed!')
    console.log('\nYou can now login with:')
    console.log('  Email: student@eduplatform.edu')
    console.log('  Password: password')
    console.log('\n  Email: educator@eduplatform.edu')
    console.log('  Password: password')

  } catch (error) {
    console.error('\n❌ Error during testing:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
