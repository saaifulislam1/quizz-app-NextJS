import type { QuizData } from "@/lib/types"

export const reactQuiz: QuizData[] = [
  {
    id: 1,
    category: "React",
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "A server-side framework",
    ],
    correctAnswer: 0,
    explanation:
      "React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications where UI updates are frequent.",
  },
  {
    id: 2,
    category: "React",
    question: "What is JSX in React?",
    options: [
      "A database query language",
      "A syntax extension that allows HTML-like code in JavaScript",
      "A testing framework for React",
      "A state management library",
    ],
    correctAnswer: 1,
    explanation:
      "JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in your JavaScript files, making it easier to describe what the UI should look like.",
  },
  {
    id: 3,
    category: "React",
    question: "What is the virtual DOM in React?",
    options: [
      "A complete copy of the real DOM",
      "A lightweight JavaScript representation of the real DOM",
      "A browser extension for debugging",
      "A method to directly manipulate the DOM",
    ],
    correctAnswer: 1,
    explanation:
      "The virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to improve performance by minimizing direct DOM manipulations. It compares the virtual DOM with the real DOM and only updates what has changed.",
  },
  {
    id: 4,
    category: "React",
    question: "What is a React component?",
    options: [
      "A CSS file",
      "A reusable piece of code that returns a React element",
      "A JavaScript function that manipulates the DOM directly",
      "A database model",
    ],
    correctAnswer: 1,
    explanation:
      "A React component is a reusable piece of code that returns React elements describing what should appear on the screen. Components can be defined as functions or classes.",
  },
  {
    id: 5,
    category: "React",
    question: "What is the purpose of state in React?",
    options: [
      "To store CSS styles",
      "To keep track of information that can change over time",
      "To connect to external APIs",
      "To define routes in the application",
    ],
    correctAnswer: 1,
    explanation:
      "State in React is used to store data that can change over time and affect a component's rendering. When state changes, React re-renders the component to reflect those changes.",
  },
  {
    id: 6,
    category: "React",
    question: "What hook is used to add state to a functional component?",
    options: ["useEffect", "useContext", "useState", "useReducer"],
    correctAnswer: 2,
    explanation:
      "The useState hook allows you to add state to functional components. It returns a stateful value and a function to update it, similar to this.state and this.setState in class components.",
  },
  {
    id: 7,
    category: "React",
    question: "What is the purpose of the useEffect hook?",
    options: [
      "To create new components",
      "To perform side effects in functional components",
      "To style components",
      "To create routes",
    ],
    correctAnswer: 1,
    explanation:
      "The useEffect hook allows you to perform side effects in functional components. Side effects might include data fetching, subscriptions, or manually changing the DOM. It serves similar purposes to componentDidMount, componentDidUpdate, and componentWillUnmount in class components.",
  },
  {
    id: 8,
    category: "React",
    question: "What is the purpose of React props?",
    options: [
      "To style components",
      "To pass data from parent to child components",
      "To create animations",
      "To connect to a database",
    ],
    correctAnswer: 1,
    explanation:
      "Props (short for properties) are used to pass data from parent to child components in React. They are read-only and help make components reusable and dynamic.",
  },
  {
    id: 9,
    category: "React",
    question: "What is the React Context API used for?",
    options: [
      "To create animations",
      "To handle form submissions",
      "To pass data through the component tree without prop drilling",
      "To optimize performance",
    ],
    correctAnswer: 2,
    explanation:
      "The Context API provides a way to share values like themes, user data, or other global information between components without explicitly passing props through every level of the component tree (prop drilling).",
  },
  {
    id: 10,
    category: "React",
    question: "What is a React Fragment?",
    options: [
      "A piece of a component that can be reused",
      "A way to group multiple elements without adding extra nodes to the DOM",
      "A special type of React component",
      "A method to split code into smaller chunks",
    ],
    correctAnswer: 1,
    explanation:
      "React Fragments allow you to group multiple elements together without adding an extra node to the DOM. This is useful when you need to return multiple elements from a component but don't want to add unnecessary divs or spans.",
  },
]
