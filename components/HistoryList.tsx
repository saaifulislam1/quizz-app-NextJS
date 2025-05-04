"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { QuizAttempt } from "@/lib/types"
import { motion } from "framer-motion"
import { Eye, Trash2, Search } from "lucide-react"
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog"

interface HistoryListProps {
  filteredHistory: QuizAttempt[]
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onViewDetails: (attempt: QuizAttempt) => void
  onDeleteAttempt: (attempt: QuizAttempt) => void
}

export function HistoryList({
  filteredHistory,
  currentPage,
  itemsPerPage,
  onPageChange,
  onViewDetails,
  onDeleteAttempt,
}: HistoryListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [attemptToDelete, setAttemptToDelete] = useState<QuizAttempt | null>(null)

  // Calculate pagination
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filteredHistory.length)
  const currentItems = filteredHistory.slice(startIndex, endIndex)

  const handleDeleteClick = (attempt: QuizAttempt) => {
    setAttemptToDelete(attempt)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (attemptToDelete) {
      onDeleteAttempt(attemptToDelete)
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

  if (filteredHistory.length === 0) {
    return (
      <motion.div
        className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Search className="mx-auto mb-4 text-muted-foreground h-16 w-16" />
        <p className="text-xl font-medium mb-2">No quiz attempts found</p>
        <p className="text-muted-foreground mb-4">Take a quiz to see your history!</p>
        <Button asChild>
          <a href="/">Take a Quiz Now</a>
        </Button>
      </motion.div>
    )
  }

  return (
    <div>
      <motion.div className="divide-y" variants={container} initial="hidden" animate="show">
        {currentItems.map((attempt, index) => {
          const formattedDate = new Date(attempt.date).toLocaleString()
          const attemptName = attempt.name || `${attempt.category} Quiz`

          return (
            <motion.div
              key={`${attempt.date}-${index}`}
              className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 -mx-4 px-4 rounded-md transition-colors"
              variants={item}
            >
              <div className="flex-1">
                <h3 className="font-medium text-lg">{attemptName}</h3>
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                    {attempt.category}
                  </span>
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="font-semibold text-primary text-lg">
                  {attempt.correct}/{attempt.total} ({attempt.percentage}%)
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(attempt)}
                    className="h-9 px-3 flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="font-medium">View Details</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClick(attempt)}
                    className="h-9 px-3 flex items-center justify-center text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="font-medium">Delete</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
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
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(page)}
                className="h-8 w-8"
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
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
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </nav>
        </div>
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
