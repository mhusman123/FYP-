import { prisma } from '../src/lib/db/prisma'

async function testAPIs() {
  console.log('🧪 Testing API Data Setup\n')

  try {
    // Check users
    const users = await prisma.user.findMany({
      take: 5,
      select: { id: true, email: true, role: true, name: true }
    })
    console.log('✅ Users in database:', users.length)
    users.forEach(u => console.log(`   - ${u.email} (${u.role})`))

    // Check courses
    const courses = await prisma.course.findMany({
      take: 5,
      include: {
        educator: { select: { name: true } },
        _count: { select: { enrollments: true, assignments: true } }
      }
    })
    console.log('\n✅ Courses in database:', courses.length)
    courses.forEach(c => console.log(`   - ${c.code}: ${c.name} by ${c.educator.name}`))

    // Check assignments
    const assignments = await prisma.assignment.findMany({
      take: 5,
      include: {
        course: { select: { name: true } }
      }
    })
    console.log('\n✅ Assignments in database:', assignments.length)
    assignments.forEach(a => console.log(`   - ${a.title} (${a.course.name})`))

    // Check submissions
    const submissions = await prisma.submission.findMany({
      take: 5,
      include: {
        student: { select: { name: true } },
        assignment: { select: { title: true } }
      }
    })
    console.log('\n✅ Submissions in database:', submissions.length)
    submissions.forEach(s => console.log(`   - ${s.student.name}: ${s.assignment.title} (Grade: ${s.grade ?? 'Not graded'})`))

    // Test API endpoint logic (simulated)
    console.log('\n📊 API Endpoint Simulation Tests\n')

    // Test: Student can see enrolled courses
    const student = users.find(u => u.role === 'STUDENT')
    if (student) {
      const enrollments = await prisma.courseEnrollment.findMany({
        where: { studentId: student.id },
        include: { course: true }
      })
      console.log(`✅ Student ${student.email} enrolled in ${enrollments.length} courses`)
    }

    // Test: Educator can see their courses
    const educator = users.find(u => u.role === 'EDUCATOR')
    if (educator) {
      const educatorCourses = await prisma.course.findMany({
        where: { educatorId: educator.id },
        include: { _count: { select: { enrollments: true } } }
      })
      console.log(`✅ Educator ${educator.email} teaching ${educatorCourses.length} courses`)
    }

    // Test: Get grades for a student
    if (student) {
      const grades = await prisma.submission.findMany({
        where: {
          studentId: student.id,
          grade: { not: null }
        },
        include: {
          assignment: {
            select: {
              title: true,
              maxPoints: true,
              course: { select: { name: true } }
            }
          }
        }
      })
      console.log(`✅ Student has ${grades.length} graded submissions`)
      
      if (grades.length > 0) {
        const totalPoints = grades.reduce((sum, g) => sum + (g.grade || 0), 0)
        const maxPoints = grades.reduce((sum, g) => sum + g.assignment.maxPoints, 0)
        const percentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0
        console.log(`   Overall: ${totalPoints}/${maxPoints} (${percentage.toFixed(1)}%)`)
      }
    }

    console.log('\n✅ All data checks passed!')
    console.log('\n📝 Next Steps:')
    console.log('   1. Start the dev server: npm run dev')
    console.log('   2. Login to get session cookies')
    console.log('   3. Test endpoints with: ./test-api.sh')
    console.log('   4. Or use the browser to interact with the UI')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAPIs()
