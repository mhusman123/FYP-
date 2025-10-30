import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('\n📊 Database Verification:\n')

  // Check users
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, totalPoints: true }
  })
  console.log('👥 Users:', users.length)
  users.forEach(u => console.log(`   - ${u.name} (${u.role}): ${u.email} - Points: ${u.totalPoints}`))

  // Check courses
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      semester: true,
      year: true,
      credits: true,
      educator: { select: { name: true } }
    }
  })
  console.log('\n📚 Courses:', courses.length)
  courses.slice(0, 5).forEach(c => console.log(`   - ${c.code}: ${c.name} by ${c.educator.name}`))
  if (courses.length > 5) {
    console.log(`   ... and ${courses.length - 5} more courses`)
  }

  // Check enrollments
  const enrollments = await prisma.courseEnrollment.findMany({
    select: {
      id: true,
      student: { select: { name: true } },
      course: { select: { code: true, name: true } }
    }
  })
  console.log('\n📝 Enrollments:', enrollments.length)
  enrollments.slice(0, 3).forEach((e: any) => 
    console.log(`   - ${e.student.name} enrolled in ${e.course.code}`)
  )
  if (enrollments.length > 3) {
    console.log(`   ... and ${enrollments.length - 3} more enrollments`)
  }

  // Check badges
  const badges = await prisma.badge.findMany({
    select: { id: true, name: true, description: true }
  })
  console.log('\n🏆 Badges:', badges.length)
  badges.forEach(b => console.log(`   - ${b.name}: ${b.description}`))

  // Check assignments
  const assignments = await prisma.assignment.findMany({
    select: {
      id: true,
      title: true,
      course: { select: { code: true } },
      maxPoints: true,
      dueDate: true
    }
  })
  console.log('\n📋 Assignments:', assignments.length)
  assignments.forEach((a: any) => 
    console.log(`   - ${a.title} (${a.course.code}): Max Points ${a.maxPoints}, Due: ${a.dueDate.toLocaleDateString()}`)
  )

  console.log('\n✅ Database verification complete!\n')

  await prisma.$disconnect()
}

main().catch((error) => {
  console.error('Error verifying database:', error)
  process.exit(1)
})
