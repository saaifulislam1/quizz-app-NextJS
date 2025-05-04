"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QuizData, UserAnswer } from "@/lib/types"
import { motion } from "framer-motion"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface QuizSectionProps {
  quizData: QuizData[]
  userAnswers: UserAnswer[]
  currentCategory: string
  onAnswerChange: (questionIndex: number, answerIndex: number) => void
  onSubmitQuiz: () => void
}

export function QuizSection({
  quizData,
  userAnswers,
  currentCategory,
  onAnswerChange,
  onSubmitQuiz,
}: QuizSectionProps) {
  const [progress, setProgress] = useState(0)
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Calculate progress
    const answeredCount = userAnswers.filter((answer) => answer !== null).length
    const totalQuestions = userAnswers.length
    const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0
    setProgress(progressPercentage)
  }, [userAnswers])

  const handleSubmitClick = () => {
    if (userAnswers.some((answer) => answer === null)) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
    } else {
      onSubmitQuiz()
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getProgressColor = () => {
    if (progress < 30) return "bg-red-500"
    if (progress < 70) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="mb-6 overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2 bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="inline-block p-1.5 rounded-full bg-primary/10">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              >
                {currentCategory === "Next.js" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-folder-git-2 text-primary"
                  >
                    <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5" />
                    <circle cx="13" cy="12" r="2" />
                    <path d="M18 19c-2.8 0-5-2.2-5-5v8" />
                    <circle cx="20" cy="19" r="2" />
                  </svg>
                )}
                {currentCategory === "React" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-atom text-primary"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
                    <path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
                  </svg>
                )}
                {currentCategory === "Node.js" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-server text-primary"
                  >
                    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                    <line x1="6" x2="6" y1="6" y2="6" />
                    <line x1="6" x2="6" y1="18" y2="18" />
                  </svg>
                )}
                {currentCategory === "Express.js" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-route text-primary"
                  >
                    <circle cx="6" cy="19" r="3" />
                    <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                    <circle cx="18" cy="5" r="3" />
                  </svg>
                )}
                {!["Next.js", "React", "Node.js", "Express.js"].includes(currentCategory) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-brain text-primary"
                  >
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
                  </svg>
                )}
              </motion.div>
            </span>
            <span className="text-primary">{currentCategory}</span> Quiz
          </CardTitle>
          <div className="text-sm font-medium bg-primary/10 px-3 py-1.5 rounded-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-help-circle mr-1.5 text-primary"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            {quizData.length} Questions
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Your Progress</span>
                <span className="text-muted-foreground">
                  {userAnswers.filter((answer) => answer !== null).length} of {quizData.length} questions answered
                </span>
              </div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getProgressColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          <motion.div className="space-y-8" variants={container} initial="hidden" animate="show">
            {quizData.map((question, questionIndex) => (
              <motion.div key={question.id} className="question-card" variants={item}>
                <div className="font-medium text-lg mb-4 flex">
                  <span className="inline-flex items-center justify-center bg-primary text-primary-foreground w-8 h-8 rounded-full text-center mr-3 shrink-0">
                    {questionIndex + 1}
                  </span>
                  <span>{question.question}</span>
                </div>
                <ul className="space-y-3 pl-11">
                  {question.options.map((option, optionIndex) => (
                    <motion.li
                      key={optionIndex}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label className="quiz-option cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={optionIndex}
                          checked={userAnswers[questionIndex] === optionIndex}
                          onChange={() => onAnswerChange(questionIndex, optionIndex)}
                          className="mr-3"
                        />
                        {option}
                      </label>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center"
          >
            {showWarning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 text-amber-600 dark:text-amber-400 flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-md"
              >
                <AlertTriangle size={18} />
                <span>Please answer all questions before submitting</span>
              </motion.div>
            )}

            <Button
              onClick={handleSubmitClick}
              disabled={userAnswers.some((answer) => answer === null)}
              className="w-full sm:w-auto text-lg py-6 px-8"
              size="lg"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Submit Quiz
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              Make sure to answer all questions before submitting your quiz.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
