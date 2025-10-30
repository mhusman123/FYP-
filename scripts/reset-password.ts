import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetPassword() {
  const email = process.argv[2]
  const newPassword = process.argv[3]
  
  if (!email || !newPassword) {
    console.log('Usage: npx tsx scripts/reset-password.ts <email> <new-password>')
    console.log('Example: npx tsx scripts/reset-password.ts user@example.com newpassword123')
    process.exit(1)
  }

  if (newPassword.length < 8) {
    console.log('❌ Password must be at least 8 characters')
    process.exit(1)
  }

  console.log(`\n🔄 Resetting password for: ${email}\n`)

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log('❌ User not found!')
      console.log('\nAvailable users:')
      const allUsers = await prisma.user.findMany({
        select: { email: true, name: true },
        take: 10
      })
      allUsers.forEach((u, i) => console.log(`   ${i + 1}. ${u.email} (${u.name})`))
      process.exit(1)
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    })

    console.log('✅ Password updated successfully!')
    console.log('\nYou can now login with:')
    console.log(`   Email: ${email}`)
    console.log(`   Password: ${newPassword}`)
    console.log('\nLogin at: http://localhost:3002/auth/signin')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

resetPassword()
