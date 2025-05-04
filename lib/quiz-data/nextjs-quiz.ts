import type { QuizData } from "@/lib/types"

export const nextjsQuiz: QuizData[] = [
  {
    id: 1,
    category: "Next.js",
    question: "What is the primary purpose of Next.js's getStaticProps function?",
    options: [
      "To fetch data at runtime for each request",
      "To fetch data at build time for static generation",
      "To authenticate users before page load",
      "To redirect users to different pages",
    ],
    correctAnswer: 1,
    explanation:
      "getStaticProps allows you to fetch data at build time, making it available as props to the page component. This enables static generation (SSG) where pages are pre-rendered during build, improving performance and SEO.",
  },
  {
    id: 2,
    category: "Next.js",
    question: "Which Next.js feature allows you to create API endpoints within your application?",
    options: ["API Routes", "Server Components", "Edge Functions", "Middleware"],
    correctAnswer: 0,
    explanation:
      "API Routes in Next.js allow you to create API endpoints as Node.js serverless functions within your Next.js application, making it easy to build your API alongside your frontend.",
  },
  {
    id: 3,
    category: "Next.js",
    question: "What is the purpose of the 'app' directory in Next.js 13 and later?",
    options: [
      "It's just an alternative to the 'pages' directory with no special features",
      "It's used exclusively for server-side code",
      "It enables the new App Router with enhanced features like layouts and server components",
      "It's used only for static assets",
    ],
    correctAnswer: 2,
    explanation:
      "The 'app' directory in Next.js 13+ introduces the App Router, which supports features like nested layouts, server components, streaming, and more advanced routing capabilities.",
  },
  {
    id: 4,
    category: "Next.js",
    question: "What is a Server Component in Next.js?",
    options: [
      "A component that only renders on the client",
      "A component that renders on the server and doesn't include client-side JavaScript by default",
      "A special type of middleware",
      "A component that only works with getServerSideProps",
    ],
    correctAnswer: 1,
    explanation:
      "Server Components in Next.js render on the server and send HTML to the client without JavaScript bundle overhead. They can access server resources directly and help reduce the client-side JavaScript bundle size.",
  },
  {
    id: 5,
    category: "Next.js",
    question: "How do you create a dynamic route in Next.js App Router?",
    options: [
      "Create a file named [param].js in the pages directory",
      "Create a folder named [param] in the app directory",
      "Use the useRouter hook with dynamic parameters",
      "Add a route configuration in next.config.js",
    ],
    correctAnswer: 1,
    explanation:
      "In the App Router, dynamic routes are created by using folders with square brackets, like [param]. This creates a dynamic segment that can be accessed via the params prop or useParams hook.",
  },
  {
    id: 6,
    category: "Next.js",
    question: "What is the purpose of the 'use client' directive in Next.js?",
    options: [
      "To indicate that a component should only be rendered on the client side",
      "To mark the boundary between server and client components",
      "To optimize the component for better performance",
      "To enable client-side navigation",
    ],
    correctAnswer: 1,
    explanation:
      "The 'use client' directive marks the boundary between server and client components. Any component with this directive and all its imported components will be part of the client bundle and have access to client-side features like hooks and browser APIs.",
  },
  {
    id: 7,
    category: "Next.js",
    question: "What is Next.js middleware used for?",
    options: [
      "To process form submissions",
      "To run code before a request is completed",
      "To optimize images automatically",
      "To handle API authentication only",
    ],
    correctAnswer: 1,
    explanation:
      "Next.js middleware runs before a request is completed, allowing you to modify the response by rewriting, redirecting, or setting headers based on the incoming request. It's useful for authentication, bot protection, and other request-based logic.",
  },
  {
    id: 8,
    category: "Next.js",
    question: "Which of the following is NOT a data fetching method in Next.js?",
    options: ["getStaticProps", "getServerSideProps", "getInitialProps", "getFetchProps"],
    correctAnswer: 3,
    explanation:
      "getFetchProps is not a data fetching method in Next.js. The valid methods are getStaticProps (for static generation), getServerSideProps (for server-side rendering), and getInitialProps (older method used in the Pages Router).",
  },
  {
    id: 9,
    category: "Next.js",
    question: "What is the purpose of the next/image component?",
    options: [
      "To add decorative images only",
      "To optimize images with automatic resizing, format conversion, and lazy loading",
      "To create image galleries",
      "To apply filters to images",
    ],
    correctAnswer: 1,
    explanation:
      "The next/image component automatically optimizes images by resizing them based on the viewport, converting them to modern formats like WebP, and implementing lazy loading for better performance and Core Web Vitals scores.",
  },
  {
    id: 10,
    category: "Next.js",
    question: "What is the purpose of the 'next.config.js' file?",
    options: [
      "To store environment variables",
      "To define React components",
      "To configure build-time settings and customize the Next.js behavior",
      "To define API routes",
    ],
    correctAnswer: 2,
    explanation:
      "The next.config.js file is used to customize various aspects of a Next.js application, such as adding environment variables, customizing webpack configuration, enabling/configuring features like internationalization, image optimization, and more.",
  },
]
