"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { QuizAttempt } from "@/lib/types"
import { motion } from "framer-motion"
import { ArrowLeft, Redo2, Trash2, CheckCircle, XCircle } from "lucide-react"
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

interface QuizDetailsProps {
  attempt: QuizAttempt
  onBackToHistory: () => void
  onDeleteAttempt: (attempt: QuizAttempt) => void
  onReattemptQuiz: (attempt: QuizAttempt) => void
}

export function QuizDetails({ attempt, onBackToHistory, onDeleteAttempt, onReattemptQuiz }: QuizDetailsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const formattedDate = new Date(attempt.date).toLocaleString()
  const attemptName = attempt.name || `${attempt.category} Quiz`

  const handleReattempt = () => {
    onReattemptQuiz(attempt)
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    onDeleteAttempt(attempt)
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

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b">
        <div>
          <Button variant="outline" size="sm" onClick={onBackToHistory} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to History
          </Button>
          <h2 className="text-2xl font-bold">{attemptName}</h2>
        </div>

        <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Date: {formattedDate}</div>
          <div>
            Score: {attempt.correct}/{attempt.total} ({attempt.percentage}%)
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button variant="default" onClick={handleReattempt} className="h-10 px-4 font-medium gap-2">
          <Redo2 className="h-4 w-4" />
          Re-attempt Quiz
        </Button>

        <Button
          variant="outline"
          className="h-10 px-4 font-medium text-destructive hover:text-destructive-foreground hover:bg-destructive gap-2"
          onClick={handleDeleteClick}
        >
          <Trash2 className="h-4 w-4" />
          Delete Attempt
        </Button>
      </div>

      {!attempt.results || attempt.results.length === 0 || !attempt.results[0].question ? (
        <motion.div
          className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-alert-triangle mx-auto mb-4 text-warning"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <p className="text-lg font-medium mb-2">Detailed results are not available for this quiz attempt</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto mb-6">
            This may be because the quiz was taken before detailed results were implemented, or there was an error
            saving the data.
          </p>
        </motion.div>
      ) : (
        <motion.div className="space-y-6" variants={container} initial="hidden" animate="show">
          {attempt.results.map((result, index) => (
            <motion.div
              key={index}
              className={`question-card ${result.isCorrect ? "correct" : "incorrect"}`}
              variants={item}
            >
              <div className="font-medium mb-4 flex">
                <span className="inline-flex items-center justify-center bg-gray-200 dark:bg-gray-700 w-8 h-8 rounded-full text-center mr-3 shrink-0">
                  {index + 1}
                </span>
                <span>{result.question}</span>
              </div>

              <ul className="space-y-2 pl-11">
                {result.options.map((option, optionIndex) => {
                  let optionClass = "quiz-option"

                  if (optionIndex === result.correctAnswer) {
                    optionClass += " correct"
                  } else if (result.userAnswer === optionIndex) {
                    optionClass += " incorrect"
                  }

                  return (
                    <li key={optionIndex}>
                      <div className={optionClass}>
                        {option}

                        {optionIndex === result.correctAnswer && (
                          <CheckCircle className="text-green-500 absolute right-4 h-5 w-5" />
                        )}

                        {result.userAnswer === optionIndex && optionIndex !== result.correctAnswer && (
                          <XCircle className="text-red-500 absolute right-4 h-5 w-5" />
                        )}
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="explanation mt-4 ml-11">{result.explanation}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName="quiz attempt"
      />
    </div>
  )
}
