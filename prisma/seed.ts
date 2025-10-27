import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 🇵🇰 Create sample educators (Pakistani names)
  const educator1 = await prisma.user.upsert({
    where: { email: 'prof.fatima@federal.edu.pk' },
    update: {},
    create: {
      email: 'prof.fatima@federal.edu.pk',
      name: 'Dr. Fatima Khan',
      role: 'EDUCATOR',
      totalPoints: 0,
    },
  })

  const educator2 = await prisma.user.upsert({
    where: { email: 'prof.hassan@federal.edu.pk' },
    update: {},
    create: {
      email: 'prof.hassan@federal.edu.pk',
      name: 'Prof. Hassan Ahmed',
      role: 'EDUCATOR',
      totalPoints: 0,
    },
  })

  // 🇵🇰 Create sample students (Pakistani names)
  const student1 = await prisma.user.upsert({
    where: { email: 'ali.malik@student.edu.pk' },
    update: {},
    create: {
      email: 'ali.malik@student.edu.pk',
      name: 'Ali Malik',
      role: 'STUDENT',
      totalPoints: 1250,
    },
  })

  const student2 = await prisma.user.upsert({
    where: { email: 'ayesha.khan@student.edu.pk' },
    update: {},
    create: {
      email: 'ayesha.khan@student.edu.pk',
      name: 'Ayesha Khan',
      role: 'STUDENT',
      totalPoints: 1580,
    },
  })

  const student3 = await prisma.user.upsert({
    where: { email: 'ahmed.hussain@student.edu.pk' },
    update: {},
    create: {
      email: 'ahmed.hussain@student.edu.pk',
      name: 'Ahmed Hussain',
      role: 'STUDENT',
      totalPoints: 920,
    },
  })

  // 🇵🇰 Create comprehensive CS curriculum courses
  // Available at Federal Board & provincial schools across Pakistan
  
  // Foundational Courses (100-200 level)
  const cs110 = await prisma.course.upsert({
    where: { code: 'CS-110' },
    update: {},
    create: {
      name: 'Introduction to Computer Science (Urdu: کمپیوٹر سائنس کا تعارف)',
      code: 'CS-110',
      description: 'Fundamental concepts of computer science, problem-solving, and computational thinking. Designed for Pakistani students.',
      semester: 'Fall',
      year: 2025,
      credits: 3,
      prerequisites: [],
      difficulty: 'BEGINNER',
      educatorId: educator1.id,
    },
  })

  const cs150 = await prisma.course.upsert({
    where: { code: 'CS-150' },
    update: {},
    create: {
      name: 'Programming Fundamentals',
      code: 'CS-150',
      description: 'Introduction to programming using Python. Variables, control structures, functions, and basic data structures.',
      semester: 'Fall',
      year: 2025,
      credits: 3,
      prerequisites: ['CS-110'],
      difficulty: 'BEGINNER',
      educatorId: educator2.id,
    },
  })

  const cs200 = await prisma.course.upsert({
    where: { code: 'CS-200' },
    update: {},
    create: {
      name: 'Data Structures & Algorithms',
      code: 'CS-200',
      description: 'Fundamental data structures and algorithm analysis for efficient problem solving.',
      semester: 'Spring',
      year: 2025,
      credits: 4,
      prerequisites: ['CS-150'],
      difficulty: 'INTERMEDIATE',
      educatorId: educator1.id,
    },
  })

  const cs210 = await prisma.course.upsert({
    where: { code: 'CS-210' },
    update: {},
    create: {
      name: 'Computer Systems & Architecture',
      code: 'CS-210',
      description: 'Computer organization, assembly language, memory hierarchy, and processor design.',
      semester: 'Spring',
      year: 2025,
      credits: 4,
      prerequisites: ['CS-150'],
      difficulty: 'INTERMEDIATE',
      educatorId: educator2.id,
    },
  })

  const cs220 = await prisma.course.upsert({
    where: { code: 'CS-220' },
    update: {},
    create: {
      name: 'Discrete Mathematics for CS',
      code: 'CS-220',
      description: 'Mathematical foundations including logic, sets, relations, functions, and graph theory.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  // Core Courses (300 level)
  const cs300 = await prisma.course.upsert({
    where: { code: 'CS-300' },
    update: {},
    create: {
      name: 'Advanced Data Structures',
      code: 'CS-300',
      description: 'Advanced data structures, balanced trees, heaps, hash tables, and graph algorithms.',
      semester: 'Fall',
      year: 2025,
      credits: 4,
      prerequisites: ['CS-200'],
      difficulty: 'INTERMEDIATE',
      educatorId: educator2.id,
    },
  })

  const cs310 = await prisma.course.upsert({
    where: { code: 'CS-310' },
    update: {},
    create: {
      name: 'Operating Systems',
      code: 'CS-310',
      description: 'Process management, memory management, file systems, and concurrent programming.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { code: 'CS-320' },
    update: {},
    create: {
      name: 'Database Systems',
      code: 'CS-320',
      description: 'Comprehensive study of database design, implementation, and optimization.',
      semester: 'Fall',
      year: 2025,
      credits: 4,
      prerequisites: ['CS-200'],
      difficulty: 'INTERMEDIATE',
      educatorId: educator2.id,
    },
  })

  const cs330 = await prisma.course.upsert({
    where: { code: 'CS-330' },
    update: {},
    create: {
      name: 'Computer Networks',
      code: 'CS-330',
      description: 'Network protocols, TCP/IP, network security, and distributed systems fundamentals.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const cs340 = await prisma.course.upsert({
    where: { code: 'CS-340' },
    update: {},
    create: {
      name: 'Software Engineering',
      code: 'CS-340',
      description: 'Software development lifecycle, project management, and team collaboration practices.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator2.id,
    },
  })

  const cs350 = await prisma.course.upsert({
    where: { code: 'CS-350' },
    update: {},
    create: {
      name: 'Theory of Computation',
      code: 'CS-350',
      description: 'Formal languages, automata theory, computability, and complexity theory.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const cs360 = await prisma.course.upsert({
    where: { code: 'CS-360' },
    update: {},
    create: {
      name: 'Computer Graphics',
      code: 'CS-360',
      description: 'Graphics algorithms, 2D/3D transformations, rendering, and visualization techniques.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator2.id,
    },
  })

  // Advanced Courses (400 level)
  const course1 = await prisma.course.upsert({
    where: { code: 'CS-401' },
    update: {},
    create: {
      name: 'Advanced Web Development',
      code: 'CS-401',
      description: 'Learn advanced concepts in web development including frameworks, databases, and deployment.',
      semester: 'Fall',
      year: 2025,
      credits: 3,
      prerequisites: ['CS-200', 'CS-320'],
      difficulty: 'ADVANCED',
      educatorId: educator1.id,
    },
  })

  const cs410 = await prisma.course.upsert({
    where: { code: 'CS-410' },
    update: {},
    create: {
      name: 'Machine Learning',
      code: 'CS-410',
      description: 'Supervised and unsupervised learning, neural networks, and practical ML applications.',
      semester: 'Spring',
      year: 2025,
      credits: 4,
      prerequisites: ['CS-200', 'CS-220'],
      difficulty: 'ADVANCED',
      educatorId: educator2.id,
    },
  })

  const cs420 = await prisma.course.upsert({
    where: { code: 'CS-420' },
    update: {},
    create: {
      name: 'Artificial Intelligence',
      code: 'CS-420',
      description: 'AI algorithms, search techniques, knowledge representation, and expert systems.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
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
      credits: 3,
      prerequisites: ['CS-200', 'CS-340'],
      difficulty: 'ADVANCED',
      educatorId: educator1.id,
    },
  })

  const cs430 = await prisma.course.upsert({
    where: { code: 'CS-430' },
    update: {},
    create: {
      name: 'Cybersecurity',
      code: 'CS-430',
      description: 'Information security, cryptography, network security, and ethical hacking principles.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator2.id,
    },
  })

  const cs440 = await prisma.course.upsert({
    where: { code: 'CS-440' },
    update: {},
    create: {
      name: 'Distributed Systems',
      code: 'CS-440',
      description: 'Distributed computing, consensus algorithms, fault tolerance, and scalable systems.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const cs450 = await prisma.course.upsert({
    where: { code: 'CS-450' },
    update: {},
    create: {
      name: 'Compiler Design',
      code: 'CS-450',
      description: 'Lexical analysis, parsing, semantic analysis, and code generation techniques.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator2.id,
    },
  })

  const cs460 = await prisma.course.upsert({
    where: { code: 'CS-460' },
    update: {},
    create: {
      name: 'Mobile Application Development',
      code: 'CS-460',
      description: 'Native and cross-platform mobile app development for iOS and Android.',
      semester: 'Fall',
      year: 2025,
      educatorId: educator1.id,
    },
  })

  const cs470 = await prisma.course.upsert({
    where: { code: 'CS-470' },
    update: {},
    create: {
      name: 'Cloud Computing',
      code: 'CS-470',
      description: 'Cloud architecture, containerization, microservices, and cloud-native development.',
      semester: 'Spring',
      year: 2025,
      educatorId: educator2.id,
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

  // Enroll student2 in foundational courses
  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: cs150.id,
        studentId: student2.id
      }
    },
    update: {},
    create: {
      courseId: cs150.id,
      studentId: student2.id,
    },
  })

  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: cs200.id,
        studentId: student2.id
      }
    },
    update: {},
    create: {
      courseId: cs200.id,
      studentId: student2.id,
    },
  })

  // Enroll student3 in various level courses
  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: cs300.id,
        studentId: student3.id
      }
    },
    update: {},
    create: {
      courseId: cs300.id,
      studentId: student3.id,
    },
  })

  await prisma.courseEnrollment.upsert({
    where: { 
      courseId_studentId: {
        courseId: cs410.id,
        studentId: student3.id
      }
    },
    update: {},
    create: {
      courseId: cs410.id,
      studentId: student3.id,
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
  console.log(`   - 18 Comprehensive CS Courses (Foundational, Core, and Advanced)`)
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