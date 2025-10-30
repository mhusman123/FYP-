import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
  const email = process.argv[2]
  
  if (!email) {
    console.log('Usage: npx tsx scripts/check-user.ts <email>')
    console.log('Example: npx tsx scripts/check-user.ts user@example.com')
    process.exit(1)
  }

  console.log(`\n🔍 Checking user: ${email}\n`)

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
        createdAt: true,
      }
    })

    if (user) {
      console.log('✅ User found!')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('ID:', user.id)
      console.log('Name:', user.name)
      console.log('Email:', user.email)
      console.log('Role:', user.role)
      console.log('Has Password:', user.password ? '✅ Yes' : '❌ No')
      console.log('Created:', user.createdAt.toLocaleString())
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n✅ This user can log in')
    } else {
      console.log('❌ User NOT found in database')
      console.log('\nTo create this user:')
      console.log('1. Go to http://localhost:3002/auth/signup')
      console.log('2. Fill in the registration form')
      console.log('3. Or use the test accounts:')
      console.log('   - student@eduplatform.edu / password')
      console.log('   - educator@eduplatform.edu / password')
    }

    // Show all users
    console.log('\n📋 All users in database:')
    const allUsers = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        role: true,
      },
      take: 10
    })
    
    if (allUsers.length === 0) {
      console.log('   (No users found - run: npx tsx scripts/seed-test-users.ts)')
    } else {
      allUsers.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.email} (${u.name}) - ${u.role}`)
      })
    }

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUser()
