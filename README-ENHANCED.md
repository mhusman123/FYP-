# 🎓 EduPlatform - Complete Educational Management System

A comprehensive, modern educational platform built with Next.js 14, TypeScript, Prisma, and NextAuth.js. Features AI-powered autograding, gamification, advanced analytics, and a complete course management system.

## ✨ Key Features

### 🎯 **Core Functionality**
- **Course Management**: Complete CS curriculum with 18+ courses from foundational to advanced
- **AI-Powered Autograding**: Instant feedback for programming assignments
- **Gamification System**: Badges, leaderboards, and achievement tracking
- **Advanced Analytics**: Detailed insights into learning patterns and performance
- **Plagiarism Detection**: Advanced similarity analysis across multiple sources
- **Grade Adjustment System**: Request and manage grade adjustments for special circumstances

### 🔐 **Authentication & User Management**
- **Multiple Sign-in Options**: Demo accounts, OAuth (Google, GitHub), and credentials
- **Role-Based Access**: Student, Educator, and Admin roles with appropriate permissions
- **Enhanced UI/UX**: Modern, responsive design with smooth animations
- **Secure Session Management**: JWT-based authentication with NextAuth.js

### 📊 **Database & Backend**
- **Flexible Database Support**: SQLite for development, PostgreSQL for production
- **Comprehensive Schema**: 18+ CS courses with prerequisites and difficulty levels
- **Automated Setup**: One-command database initialization and seeding
- **Type-Safe ORM**: Prisma with full TypeScript support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduplatform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run setup
   ```
   This will:
   - Generate Prisma client
   - Create SQLite database
   - Seed with comprehensive CS courses and demo data

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Visit: http://localhost:3000
   - View database: `npx prisma studio`

### 🎮 Demo Accounts

**Student Account:**
- Email: `student@demo.edu`
- Features: Course enrollment, assignment submission, progress tracking, gamification

**Educator Account:**
- Email: `educator@demo.edu`  
- Features: Course management, autograding, analytics, student management

## 📁 Project Structure

```
eduplatform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Protected dashboard pages
│   │   ├── api/               # API routes
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components (shadcn/ui)
│   │   └── features/         # Feature-specific components
│   ├── lib/                   # Utilities and configurations
│   ├── hooks/                 # Custom React hooks
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
├── scripts/                   # Setup and utility scripts
└── public/                    # Static assets
```

## 🎓 Complete CS Curriculum

### Foundational Courses (100-200 level)
- **CS-110**: Introduction to Computer Science
- **CS-150**: Programming Fundamentals (Python)
- **CS-200**: Data Structures & Algorithms  
- **CS-210**: Computer Systems & Architecture
- **CS-220**: Discrete Mathematics for CS

### Core Courses (300 level)
- **CS-300**: Advanced Data Structures
- **CS-310**: Operating Systems
- **CS-320**: Database Systems
- **CS-330**: Computer Networks
- **CS-340**: Software Engineering
- **CS-350**: Theory of Computation
- **CS-360**: Computer Graphics

### Advanced Courses (400 level)
- **CS-401**: Advanced Web Development
- **CS-410**: Machine Learning
- **CS-420**: Artificial Intelligence
- **CS-425**: Human-Computer Interaction
- **CS-430**: Cybersecurity
- **CS-440**: Distributed Systems
- **CS-450**: Compiler Design
- **CS-460**: Mobile Application Development
- **CS-470**: Cloud Computing

Each course includes:
- ✅ Proper prerequisite chains
- ✅ Difficulty levels (Beginner/Intermediate/Advanced)
- ✅ Credit hours (3-4 credits)
- ✅ Comprehensive descriptions
- ✅ Autograding support

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run setup        # Complete database setup
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
npm run db:reset     # Reset database
```

### Database Configuration

**Development (SQLite)**
```env
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
```

**Production (PostgreSQL)**
```env
DATABASE_PROVIDER="postgresql" 
DATABASE_URL="postgresql://user:password@localhost:5432/eduplatform"
```

### Environment Variables

Create `.env` file:
```env
# Database
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_ID=""
GITHUB_SECRET=""
```

## 📱 Features Overview

### 🏠 **Landing Page**
- Modern, responsive design with gradient backgrounds
- Feature showcase with hover animations
- Pricing tiers (Student/Educator/Institution)
- Customer testimonials and statistics
- Call-to-action sections

### 🔐 **Authentication System**
- Enhanced sign-in page with demo accounts
- Role-based registration (Student/Educator)
- OAuth integration (Google, GitHub)
- Password strength validation
- Error handling and user feedback

### 📊 **Dashboard**
- Role-specific layouts and navigation
- Progress tracking and analytics
- Quick actions and notifications
- Responsive design for all devices

### 📚 **Course Management**
- Complete CS curriculum with prerequisites
- Course enrollment and progress tracking
- Assignment submission and grading
- Instructor tools and analytics

### 🏆 **Gamification**
- Badge system with achievement tracking
- Leaderboards and competitive elements
- Progress visualization
- Reward systems

### 🔍 **Advanced Features**
- AI-powered autograding system
- Plagiarism detection algorithms
- Comprehensive analytics dashboard
- Grade adjustment request system

## 🎨 UI/UX Design

### Design System
- **Framework**: Tailwind CSS with custom configurations
- **Components**: shadcn/ui for consistent, accessible components
- **Icons**: Lucide React icon set
- **Typography**: Custom font stack with proper hierarchy
- **Colors**: Professional gradient palette
- **Animations**: Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Breakpoint optimization
- Touch-friendly interfaces
- Cross-browser compatibility

## 🔧 Technical Stack

### Frontend
- **Next.js 14**: App Router, Server Components, Turbopack
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Lucide React**: Icon system

### Backend
- **NextAuth.js**: Authentication and session management
- **Prisma**: Type-safe database ORM
- **SQLite/PostgreSQL**: Database options
- **API Routes**: Next.js API handlers

### Development
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Prisma Studio**: Database management
- **Git**: Version control

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push

### Docker
```dockerfile
# Dockerfile included for containerization
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment
```bash
npm run build
npm run start
```

## 📈 Performance

### Optimizations
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Strategic caching for static content
- **Database**: Efficient queries with Prisma

### Monitoring
- **Analytics**: Built-in performance tracking
- **Error Handling**: Comprehensive error boundaries
- **Logging**: Structured logging system

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- **API Reference**: `/docs/api`
- **Component Library**: `/docs/components`
- **Database Schema**: `/docs/database`

### Getting Help
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions
- **Email**: support@eduplatform.com

## 🎉 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- shadcn/ui for the beautiful component library
- Prisma team for the excellent ORM
- All contributors and beta testers

---

**Built with ❤️ for educators and students worldwide**

*Transform your educational experience with EduPlatform - where learning meets innovation.*