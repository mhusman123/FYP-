import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample educators
  const educator1 = await prisma.user.upsert({
    where: { email: 'prof.smith@university.edu' },
    update: {},
    create: {
      email: 'prof.smith@university.edu',
      name: 'Dr. Sarah Smith',
      role: 'EDUCATOR',
      totalPoints: 0,
    },
  })

  const educator2 = await prisma.user.upsert({
    where: { email: 'prof.johnson@university.edu' },
    update: {},
    create: {
      email: 'prof.johnson@university.edu',
      name: 'Prof. Michael Johnson',
      role: 'EDUCATOR',
      totalPoints: 0,
    },
  })

  // Create sample students
  const student1 = await prisma.user.upsert({
    where: { email: 'john.doe@student.edu' },
    update: {},
    create: {
      email: 'john.doe@student.edu',
      name: 'John Doe',
      role: 'STUDENT',
      totalPoints: 1250,
    },
  })

  const student2 = await prisma.user.upsert({
    where: { email: 'jane.smith@student.edu' },
    update: {},
    create: {
      email: 'jane.smith@student.edu',
      name: 'Jane Smith',
      role: 'STUDENT',
      totalPoints: 1580,
    },
  })

  const student3 = await prisma.user.upsert({
    where: { email: 'alex.wilson@student.edu' },
    update: {},
    create: {
      email: 'alex.wilson@student.edu',
      name: 'Alex Wilson',
      role: 'STUDENT',
      totalPoints: 920,
    },
  })

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { code: 'CS-401' },
    update: {},
    create: {
      name: 'Advanced Web Development',
      code: 'CS-401',
      description: 'Learn advanced concepts in web development including frameworks, databases, and deployment.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { code: 'CS-380' },
    update: {},
    create: {
      name: 'Database Systems',
      code: 'CS-380',
      description: 'Comprehensive study of database design, implementation, and optimization.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator2.id,
    },
  })

  const course3 = await prisma.course.upsert({
    where: { code: 'CS-425' },
    update: {},
    create: {
      name: 'Human-Computer Interaction',
      code: 'CS-425',
      description: 'Study of how people interact with computers and design of computer interfaces.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  // Enroll students in courses
  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: course1.id,
        studentId: student1.id
      }
    },
    update: {},
    create: {
      courseId: course1.id,
      studentId: student1.id,
    },
  })

  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: course2.id,
        studentId: student1.id
      }
    },
    update: {},
    create: {
      courseId: course2.id,
      studentId: student1.id,
    },
  })

  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: course3.id,
        studentId: student1.id
      }
    },
    update: {},
    create: {
      courseId: course3.id,
      studentId: student1.id,
    },
  })

  // Create sample badges
  const badge1 = await prisma.badge.upsert({
    where: { name: 'Early Bird' },
    update: {},
    create: {
      name: 'Early Bird',
      description: 'Submitted 5 assignments before deadline',
      icon: 'star',
      color: '#22c55e',
      criteria: {
        type: 'ASSIGNMENT_COUNT',
        threshold: 5,
        timeframe: 'early'
      },
      points: 50,
    },
  })

  const badge2 = await prisma.badge.upsert({
    where: { name: 'Perfect Score' },
    update: {},
    create: {
      name: 'Perfect Score',
      description: 'Achieved 100% on an assignment',
      icon: 'trophy',
      color: '#f59e0b',
      criteria: {
        type: 'GRADE_AVERAGE',
        threshold: 100
      },
      points: 100,
    },
  })

  const badge3 = await prisma.badge.upsert({
    where: { name: 'Consistent Performer' },
    update: {},
    create: {
      name: 'Consistent Performer',
      description: 'Maintained 85%+ average for a month',
      icon: 'target',
      color: '#3b82f6',
      criteria: {
        type: 'GRADE_AVERAGE',
        threshold: 85,
        timeframe: 'month'
      },
      points: 75,
    },
  })

  // Award some badges to students
  await prisma.userBadge.upsert({
    where: {
      userId_badgeId: {
        userId: student1.id,
        badgeId: badge1.id
      }
    },
    update: {},
    create: {
      userId: student1.id,
      badgeId: badge1.id,
      earnedAt: new Date('2025-09-15'),
    },
  })

  await prisma.userBadge.upsert({
    where: {
      userId_badgeId: {
        userId: student1.id,
        badgeId: badge2.id
      }
    },
    update: {},
    create: {
      userId: student1.id,
      badgeId: badge2.id,
      earnedAt: new Date('2025-09-10'),
    },
  })

  // Create sample assignments
  const assignment1 = await prisma.assignment.upsert({
    where: { id: 'assignment-1' },
    update: {},
    create: {
      id: 'assignment-1',
      title: 'Research Paper Draft',
      description: 'Write a research paper on modern web development trends',
      instructions: 'Your paper should be 10-15 pages and include at least 10 academic references. Focus on emerging technologies and their impact on web development practices.',
      dueDate: new Date('2025-09-20'),
      maxPoints: 100,
      allowedFileTypes: ['pdf', 'doc', 'docx'],
      maxFileSize: 10485760, // 10MB
      isPublished: true,
      courseId: course1.id,
    },
  })

  const assignment2 = await prisma.assignment.upsert({
    where: { id: 'assignment-2' },
    update: {},
    create: {
      id: 'assignment-2',
      title: 'Database Design Project',
      description: 'Design and implement a database for an e-commerce system',
      instructions: 'Create an ERD, implement the database in PostgreSQL, and provide sample queries demonstrating key operations.',
      dueDate: new Date('2025-09-22'),
      maxPoints: 150,
      allowedFileTypes: ['sql', 'pdf', 'zip'],
      maxFileSize: 20971520, // 20MB
      isPublished: true,
      courseId: course2.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created:`)
  console.log(`   - 2 Educators`)
  console.log(`   - 3 Students`)
  console.log(`   - 3 Courses`)
  console.log(`   - 3 Badges`)
  console.log(`   - 2 Assignments`)
  console.log(`   - Course enrollments and badge awards`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })