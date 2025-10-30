import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function setAllPasswords() {
  const newPassword = process.argv[2] || 'password123'
  
  console.log(`\n🔐 Setting password for ALL users to: ${newPassword}\n`)

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    if (users.length === 0) {
      console.log('❌ No users found in database')
      return
    }

    console.log(`Found ${users.length} users:\n`)

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    for (const user of users) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      })
      
      console.log(`✅ ${user.email} (${user.name}) - ${user.role}`)
    }

    console.log(`\n✅ All ${users.length} users now have password: ${newPassword}`)
    console.log(`\n🚀 You can now login with ANY of these accounts using password: ${newPassword}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

setAllPasswords()
