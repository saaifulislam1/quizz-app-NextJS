# Quiz Master

![Quiz Master Logo](public/quiz-master-logo.png)

A modern, interactive quiz application built with Next.js and Tailwind CSS. Test your knowledge on various programming topics or create your own custom quizzes.

## ✨ Features

- **Multiple Quiz Categories**: Pre-built quizzes on Next.js, React, Node.js, and Express.js
- **Custom Quizzes**: Upload or paste your own JSON quiz data
- **Quiz History**: Track your progress and review past quiz attempts
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Animations**: Smooth transitions and interactive elements
- **Accessibility**: Built with accessibility in mind

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/quiz-master.git
cd quiz-master
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Project Structure

\`\`\`
quiz-master/
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── categories/       # Category pages
│   ├── history/          # Quiz history page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── ...               # Other components
├── lib/                  # Utility functions and data
│   ├── quiz-data/        # Quiz data files
│   └── ...               # Other utilities
├── public/               # Static assets
└── ...                   # Config files
\`\`\`

## 🧩 Creating Custom Quizzes

You can create your own quizzes by preparing a JSON file in the following format:

\`\`\`json
[
  {
    "id": 1,
    "category": "Your Category",
    "question": "Your question here?",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "correctAnswer": 1,
    "explanation": "Explanation for the correct answer"
  },
  // More questions...
]
\`\`\`

Then, upload this file or paste its contents in the "Custom Quiz" section.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Confetti effects

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
