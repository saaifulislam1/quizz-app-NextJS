import type { QuizData } from "@/lib/types"

export const nodejsQuiz: QuizData[] = [
  {
    id: 1,
    category: "Node.js",
    question: "What is Node.js?",
    options: [
      "A front-end JavaScript framework",
      "A JavaScript runtime built on Chrome's V8 JavaScript engine",
      "A database management system",
      "A programming language",
    ],
    correctAnswer: 1,
    explanation:
      "Node.js is a JavaScript runtime environment that executes JavaScript code outside of a web browser. It's built on Chrome's V8 JavaScript engine and allows developers to use JavaScript for server-side scripting.",
  },
  {
    id: 2,
    category: "Node.js",
    question: "What is npm in Node.js?",
    options: ["Node Package Manager", "Node Programming Method", "New Project Module", "Node Process Monitor"],
    correctAnswer: 0,
    explanation:
      "npm (Node Package Manager) is the default package manager for Node.js. It consists of a command-line client and an online database of public and private packages called the npm registry.",
  },
  {
    id: 3,
    category: "Node.js",
    question: "Which of the following is a core module in Node.js?",
    options: ["express", "mongoose", "fs", "axios"],
    correctAnswer: 2,
    explanation:
      "fs (File System) is a core module in Node.js that provides an API for interacting with the file system. Core modules are built into Node.js and don't need to be installed separately.",
  },
  {
    id: 4,
    category: "Node.js",
    question: "What is the event loop in Node.js?",
    options: [
      "A UI component for handling user events",
      "A mechanism that allows Node.js to perform non-blocking I/O operations",
      "A type of database query",
      "A method for looping through arrays",
    ],
    correctAnswer: 1,
    explanation:
      "The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded. It works by offloading operations to the system kernel whenever possible and executing callbacks when operations complete.",
  },
  {
    id: 5,
    category: "Node.js",
    question: "What does the 'require' function do in Node.js?",
    options: [
      "Requires a specific version of Node.js to run",
      "Imports modules for use in the current file",
      "Requires user authentication",
      "Validates input data",
    ],
    correctAnswer: 1,
    explanation:
      "The require function in Node.js is used to import modules (both built-in and external) into the current file. It's the primary way to include external code in your Node.js application.",
  },
  {
    id: 6,
    category: "Node.js",
    question: "What is a callback in Node.js?",
    options: [
      "A function passed as an argument to another function, to be executed later",
      "A way to return data from a function",
      "A method to connect to a database",
      "A special type of variable",
    ],
    correctAnswer: 0,
    explanation:
      "A callback is a function passed as an argument to another function, which is then invoked inside the outer function. Callbacks are commonly used in Node.js for handling asynchronous operations.",
  },
  {
    id: 7,
    category: "Node.js",
    question: "What is middleware in the context of Node.js and Express?",
    options: [
      "Software that connects an application to a database",
      "Functions that have access to the request and response objects and the next middleware function",
      "A type of database",
      "A method for handling errors",
    ],
    correctAnswer: 1,
    explanation:
      "In Express, middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify request and response objects, end the request-response cycle, or call the next middleware function.",
  },
  {
    id: 8,
    category: "Node.js",
    question: "What is the purpose of package.json in a Node.js project?",
    options: [
      "To store JavaScript code",
      "To define project metadata and dependencies",
      "To configure the database",
      "To store user data",
    ],
    correctAnswer: 1,
    explanation:
      "The package.json file in a Node.js project contains metadata about the project (like name, version, description) and lists the dependencies required by the project. It also can contain scripts, configuration settings, and other metadata.",
  },
  {
    id: 9,
    category: "Node.js",
    question: "What is the purpose of the 'buffer' class in Node.js?",
    options: [
      "To cache database queries",
      "To handle binary data",
      "To buffer network requests",
      "To store session information",
    ],
    correctAnswer: 1,
    explanation:
      "The Buffer class in Node.js is used to handle binary data. It provides a way to work with different types of binary data streams, such as reading files, receiving HTTP requests, or handling TCP streams.",
  },
  {
    id: 10,
    category: "Node.js",
    question: "What is the purpose of the 'process' object in Node.js?",
    options: [
      "To create new processes",
      "To provide information about and control over the current Node.js process",
      "To process HTTP requests",
      "To handle file processing",
    ],
    correctAnswer: 1,
    explanation:
      "The process object in Node.js provides information about and control over the current Node.js process. It includes properties for environment variables, command-line arguments, and methods to control the process's behavior.",
  },
]
