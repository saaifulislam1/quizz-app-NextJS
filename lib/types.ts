export interface QuizData {
  id: number
  category: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export type UserAnswer = number | null

export interface QuizAttempt {
  name: string
  category: string
  date: string
  correct: number
  total: number
  percentage: number
  results: QuizResult[]
}

export interface QuizResult {
  questionId: number
  question: string
  options: string[]
  correctAnswer: number
  userAnswer: number | null
  isCorrect: boolean
  explanation: string
}
