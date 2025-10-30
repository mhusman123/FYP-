import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function testLogin() {
  const email = 'usama@codecross.co'
  const password = 'password123'
  
  console.log(`\n🔐 Testing login for: ${email}`)
  console.log(`Password: ${password}\n`)
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) {
    console.log('❌ User not found')
    return
  }
  
  console.log('✅ User found!')
  console.log(`   Name: ${user.name}`)
  console.log(`   Role: ${user.role}`)
  console.log(`   Has password: ${user.password ? 'Yes' : 'No'}\n`)
  
  if (!user.password) {
    console.log('❌ User has no password set')
    return
  }
  
  // Test password
  console.log('🔍 Testing password verification...')
  const isValid = await bcrypt.compare(password, user.password)
  
  if (isValid) {
    console.log('✅ Password is CORRECT! Login should work.')
  } else {
    console.log('❌ Password is INCORRECT!')
    console.log('\nTrying different passwords:')
    
    const testPasswords = [
      'Password123',
      'PASSWORD123',
      'password',
      'Usama123',
      'usama123'
    ]
    
    for (const testPw of testPasswords) {
      const match = await bcrypt.compare(testPw, user.password)
      if (match) {
        console.log(`✅ Correct password is: ${testPw}`)
        break
      }
    }
  }
  
  await prisma.$disconnect()
}

testLogin()
