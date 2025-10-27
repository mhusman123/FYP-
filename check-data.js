import { PrismaClient } from '@prisma/client'

async function checkData() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Checking database data...\n')
    
    // Check users
    const users = await prisma.user.findMany()
    console.log(`👥 Users: ${users.length}`)
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`)
    })
    
    // Check courses
    const courses = await prisma.course.findMany()
    console.log(`\n📚 Courses: ${courses.length}`)
    courses.slice(0, 5).forEach(course => {
      console.log(`  - ${course.name} (${course.code})`)
    })
    
    // Check enrollments
    const enrollments = await prisma.courseEnrollment.findMany({
      include: {
        student: { select: { name: true, email: true } },
        course: { select: { name: true, code: true } }
      }
    })
    console.log(`\n🎓 Enrollments: ${enrollments.length}`)
    enrollments.forEach(enrollment => {
      console.log(`  - ${enrollment.student.name} enrolled in ${enrollment.course.name}`)
    })
    
    // Check badges
    const badges = await prisma.badge.findMany()
    console.log(`\n🏆 Badges: ${badges.length}`)
    badges.forEach(badge => {
      console.log(`  - ${badge.name}: ${badge.description}`)
    })
    
    // Check user badges
    const userBadges = await prisma.userBadge.findMany({
      include: {
        user: { select: { name: true } },
        badge: { select: { name: true } }
      }
    })
    console.log(`\n🎖️ User Badges: ${userBadges.length}`)
    userBadges.forEach(ub => {
      console.log(`  - ${ub.user.name} earned ${ub.badge.name}`)
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()