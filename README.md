# EduPlatform - Educational Management System

A comprehensive educational platform built with Next.js 14, TypeScript, TailwindCSS, and ShadCN UI components.

## 🚀 Features

### Core Educational Features
- **Student Dashboard** - Overview of courses, assignments, and progress
- **Assignment Submission System** - File upload with deadline tracking
- **Gamification** - Badges, leaderboards, and point systems
- **Grade Adjustment Requests** - Unique system for special circumstances (illness, emergencies)

### Technical Features
- **Modern Tech Stack** - Next.js 14, TypeScript, TailwindCSS
- **Responsive Design** - Works on desktop and mobile
- **Component Library** - ShadCN UI for consistent design
- **Database** - Prisma ORM with PostgreSQL
- **Authentication** - NextAuth.js ready
- **File Uploads** - UploadThing integration ready

## 🛠️ Setup Instructions

### Quick Start (Demo Mode)
```bash
cd eduplatform
npm install
npm run dev
```
Visit `http://localhost:3000` to see the **live demo** with all features!

### Full Setup (Production Ready)

#### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (for full functionality)
- Git

#### 1. Clone and Install
```bash
cd eduplatform
npm install
```

#### 2. Environment Setup
Copy `.env.example` to `.env.local` and configure:

```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with your values
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/eduplatform?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here-make-it-long-and-random"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_ID="your-github-app-id" 
GITHUB_SECRET="your-github-app-secret"
```

#### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations  
npx prisma db push

# (Optional) Seed with sample data
npx prisma db seed
```

#### 4. Development Server
```bash
npm run dev
```

### 🎯 MVP Status
- ✅ **Demo Available**: Full UI/UX showcase at `/demo`
- ✅ **Authentication**: NextAuth.js with Google/GitHub
- ✅ **Database**: PostgreSQL schema ready
- 🔄 **API Integration**: In progress
- 🔄 **File Uploads**: Basic structure ready

## 📋 Design Brief Implementation

This project implements the comprehensive design requirements:

### 1. **Design Guidelines for Educational Platform** ✅
- Modern, clean interface using ShadCN components
- Consistent color scheme and typography
- Responsive design for all screen sizes

### 2. **Gamification Feature Specification** ✅
- Badge system with progress tracking
- Leaderboard with weekly rankings
- Point accumulation system

### 3. **Assignment Submission Flow Design** ✅
- Drag-and-drop file upload interface
- Deadline tracking with visual indicators
- File type and size validation

### 4. **Grade Adjustment Module Design** ✅
- **Unique Problem Solution**: Comprehensive grade review system
- Multiple adjustment reasons (Medical, Family Emergency, Technical Issues, etc.)
- Supporting document upload
- Status tracking and transparent process

## 🎯 Key Features

### Student Experience
- **Dashboard**: Overview of courses, deadlines, and achievements
- **Assignment Submission**: Intuitive file upload with progress tracking
- **Gamification**: Badges, points, and leaderboard rankings
- **Grade Requests**: Request grade adjustments for special circumstances

### Unique Value Proposition
The **Grade Adjustment System** addresses real educational challenges where students face circumstances that affect performance.

## 🚀 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npx prisma studio    # Open database browser
npm run lint         # Run ESLint
```

## 📦 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, ShadCN UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **File Upload**: UploadThing
- **Forms**: React Hook Form with Zod validation

**Built with ❤️ for education**

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
