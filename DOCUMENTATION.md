# Quiz Master - Developer Documentation

This document provides detailed information for developers who want to understand, modify, or extend the Quiz Master application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Data Flow](#data-flow)
7. [API Routes](#api-routes)
8. [Adding New Features](#adding-new-features)
9. [Common Issues and Solutions](#common-issues-and-solutions)
10. [Performance Considerations](#performance-considerations)

## Project Overview

Quiz Master is a Next.js application that allows users to take quizzes on various programming topics or create their own custom quizzes. The application includes features like quiz history tracking, dark mode, and responsive design.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (based on Radix UI)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Fonts**: Google Fonts (Outfit, Nunito Sans)

## Project Structure

\`\`\`
quiz-master/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   │   └── quizzes/      # Quiz data API endpoints
│   ├── categories/       # Category pages
│   │   └── [categoryId]/ # Dynamic category page
│   ├── history/          # Quiz history page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── Layout.tsx        # Main layout wrapper
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Page footer
│   ├── QuizInput.tsx     # Custom quiz input component
│   ├── QuizSection.tsx   # Quiz questions display
│   └── ResultsSection.tsx # Quiz results display
├── lib/                  # Utility functions and data
│   ├── quiz-data/        # Quiz data files
│   │   ├── nextjs-quiz.ts
│   │   ├── react-quiz.ts
│   │   ├── nodejs-quiz.ts
│   │   └── express-quiz.ts
│   ├── categories.tsx    # Category definitions
│   ├── quizStorage.ts    # Local storage utilities
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # General utility functions
├── public/               # Static assets
└── ...                   # Config files
\`\`\`

## Component Architecture

### Core Components

1. **Layout**: Wraps all pages with header and footer
2. **Header**: Navigation and theme toggle
3. **QuizInput**: Handles custom quiz data input
4. **QuizSection**: Displays quiz questions and collects answers
5. **ResultsSection**: Shows quiz results and allows saving
6. **HistoryList**: Displays quiz history
7. **QuizDetails**: Shows detailed results of a past quiz

### Component Relationships

\`\`\`
Layout
├── Header
├── Page Content
│   ├── Home Page
│   │   ├── QuizInput
│   │   ├── QuizSection
│   │   └── ResultsSection
│   ├── Categories Page
│   │   └── Category Cards
│   ├── Category Quiz Page
│   │   ├── QuizSection
│   │   └── ResultsSection
│   └── History Page
│       ├── HistoryList
│       └── QuizDetails
└── Footer
\`\`\`

## State Management

The application uses React's built-in state management with `useState` and `useEffect` hooks. Local storage is used to persist quiz history between sessions.

### Key State Variables

- **Home Page**:
  - `quizData`: Array of quiz questions
  - `userAnswers`: Array of user's selected answers
  - `currentCategory`: Current quiz category
  - `quizResults`: Results after quiz submission
  - `currentView`: Current view state ("home", "input", "quiz", "results")

- **History Page**:
  - `quizHistory`: All saved quiz attempts
  - `filteredHistory`: Filtered quiz attempts based on search/category
  - `selectedAttempt`: Currently selected attempt for detailed view

## Data Flow

1. **Quiz Data Loading**:
   - Pre-defined quizzes: Loaded via API routes from `/lib/quiz-data/`
   - Custom quizzes: Parsed from user input JSON

2. **Quiz Taking Flow**:
   - User selects answers → Updates `userAnswers` state
   - User submits quiz → Generates `quizResults`
   - User saves attempt → Stores in local storage

3. **History Viewing Flow**:
   - App loads quiz history from local storage
   - User can filter/search history
   - User can view detailed results or delete attempts

## API Routes

The application uses API routes to serve quiz data:

- `GET /api/quizzes/[categoryId]`: Returns quiz data for the specified category

## Adding New Features

### Adding a New Quiz Category

1. Create a new quiz data file in `/lib/quiz-data/`:

\`\`\`typescript
// lib/quiz-data/your-category-quiz.ts
import type { QuizData } from "@/lib/types"

export const yourCategoryQuiz: QuizData[] = [
  {
    id: 1,
    category: "Your Category",
    question: "Your question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 0,
    explanation: "Explanation for the correct answer",
  },
  // Add more questions...
]
\`\`\`

2. Add the category to the categories list in `/lib/categories.tsx`:

\`\`\`typescript
// Add to the categories array
{
  id: "your-category-id",
  name: "Your Category",
  description: "Description of your category",
  questionCount: 10, // Number of questions
  icon: (
    <YourIcon className="h-6 w-6" />
  ),
},
\`\`\`

3. Update the API route in `/app/api/quizzes/[categoryId]/route.ts`:

\`\`\`typescript
// Import your new quiz data
import { yourCategoryQuiz } from "@/lib/quiz-data/your-category-quiz"

// Add to the switch statement
case "your-category-id":
  return NextResponse.json(yourCategoryQuiz)
\`\`\`

### Adding New UI Components

1. Create your component in the `/components/` directory
2. Import and use it in the relevant page or parent component
3. For shadcn/ui components, use the CLI to add them:

\`\`\`bash
npx shadcn@latest add component-name
\`\`\`

## Common Issues and Solutions

### Maximum Update Depth Exceeded

This error occurs when there's an infinite loop in state updates. Check:

1. `useEffect` dependency arrays
2. Conditional state updates
3. Ensure state updates don't trigger other effects that update state

### Local Storage Issues

If quiz history isn't saving or loading correctly:

1. Check browser storage permissions
2. Verify JSON parsing/stringifying is correct
3. Use the cache mechanism in `quizStorage.ts`

### Responsive Design Issues

If UI doesn't look right on certain devices:

1. Use Tailwind's responsive prefixes (sm:, md:, lg:)
2. Test with browser dev tools in different screen sizes
3. Check flex/grid layouts for proper wrapping

## Performance Considerations

1. **Memoization**: Use `useMemo` and `useCallback` for expensive calculations or functions
2. **Code Splitting**: Leverage Next.js's automatic code splitting
3. **Image Optimization**: Use Next.js Image component for optimized images
4. **Animation Performance**: Keep animations simple and use `will-change` for complex animations
5. **Local Storage**: Minimize reads/writes to local storage

## Deployment

The application can be deployed on Vercel with minimal configuration:

1. Connect your GitHub repository to Vercel
2. Configure build settings if needed
3. Deploy

For other platforms, build the application with:

\`\`\`bash
npm run build
\`\`\`

And serve the output from the `.next` directory.
