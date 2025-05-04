import type { QuizData } from "@/lib/types"

export const expressQuiz: QuizData[] = [
  {
    id: 1,
    category: "Express.js",
    question: "What is Express.js?",
    options: [
      "A database management system",
      "A front-end JavaScript framework",
      "A minimal and flexible Node.js web application framework",
      "A testing framework for JavaScript",
    ],
    correctAnswer: 2,
    explanation:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building web applications and APIs with Node.js.",
  },
  {
    id: 2,
    category: "Express.js",
    question: "How do you install Express.js in a Node.js project?",
    options: ["npm add express", "npm install express", "node install express", "yarn express add"],
    correctAnswer: 1,
    explanation:
      "Express.js can be installed in a Node.js project using the npm (Node Package Manager) command: npm install express. This adds Express as a dependency in your package.json file.",
  },
  {
    id: 3,
    category: "Express.js",
    question: "What is middleware in Express.js?",
    options: [
      "A database connector",
      "Functions that have access to the request and response objects",
      "A template engine",
      "A routing mechanism",
    ],
    correctAnswer: 1,
    explanation:
      "Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle. They can execute code, modify request and response objects, end the request-response cycle, or call the next middleware function.",
  },
  {
    id: 4,
    category: "Express.js",
    question: "How do you define a route in Express.js?",
    options: [
      "app.route('/path', function(req, res) { ... })",
      "app.get('/path', function(req, res) { ... })",
      "app.define('/path', function(req, res) { ... })",
      "app.path('/route', function(req, res) { ... })",
    ],
    correctAnswer: 1,
    explanation:
      "In Express.js, routes are defined using methods like app.get(), app.post(), app.put(), etc., corresponding to HTTP methods. For example, app.get('/path', function(req, res) { ... }) defines a route that responds to GET requests at the specified path.",
  },
  {
    id: 5,
    category: "Express.js",
    question: "What is the purpose of the express.static middleware?",
    options: [
      "To serve static files such as images, CSS, and JavaScript",
      "To create static variables in Express",
      "To generate static HTML pages",
      "To cache static data",
    ],
    correctAnswer: 0,
    explanation:
      "The express.static middleware function in Express.js is used to serve static files such as images, CSS, JavaScript, etc. It's the only middleware function that comes bundled with Express.",
  },
  {
    id: 6,
    category: "Express.js",
    question: "How do you access URL parameters in Express.js?",
    options: ["req.params", "req.query", "req.body", "req.url"],
    correctAnswer: 0,
    explanation:
      "In Express.js, URL parameters (defined as :paramName in route paths) can be accessed through the req.params object. For example, for a route '/users/:id', the value of 'id' can be accessed as req.params.id.",
  },
  {
    id: 7,
    category: "Express.js",
    question: "What is the purpose of the body-parser middleware in Express.js?",
    options: [
      "To parse HTML body content",
      "To parse incoming request bodies before your handlers",
      "To validate request body data",
      "To compress response body data",
    ],
    correctAnswer: 1,
    explanation:
      "The body-parser middleware in Express.js is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property. It can parse various formats including JSON, raw, text, and URL-encoded data.",
  },
  {
    id: 8,
    category: "Express.js",
    question: "How do you handle errors in Express.js?",
    options: [
      "Using try-catch blocks only",
      "Using the next(error) function and error-handling middleware",
      "Using the express.error() method",
      "Errors cannot be handled in Express.js",
    ],
    correctAnswer: 1,
    explanation:
      "In Express.js, errors are typically handled by passing them to the next() function, which then skips all remaining handlers in the chain except for error handlers. Error-handling middleware functions are defined with four arguments (err, req, res, next) instead of the usual three.",
  },
  {
    id: 9,
    category: "Express.js",
    question: "What is Express Router?",
    options: [
      "A built-in template engine",
      "A middleware for handling file uploads",
      "A class to create modular, mountable route handlers",
      "A tool for generating API documentation",
    ],
    correctAnswer: 2,
    explanation:
      "Express Router is a class that helps create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a 'mini-app'.",
  },
  {
    id: 10,
    category: "Express.js",
    question: "How do you set the view engine in Express.js?",
    options: [
      "app.engine('view engine', 'ejs')",
      "app.set('view engine', 'ejs')",
      "app.use('view engine', 'ejs')",
      "app.config('view engine', 'ejs')",
    ],
    correctAnswer: 1,
    explanation:
      "In Express.js, you can set the view engine using the app.set() method. For example, app.set('view engine', 'ejs') sets EJS as the template engine. This allows you to render views without specifying the engine extension.",
  },
]
