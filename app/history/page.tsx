"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { HistoryList } from "@/components/HistoryList"
import { QuizDetails } from "@/components/QuizDetails"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getQuizHistory, clearQuizHistoryCache } from "@/lib/quizStorage"
import type { QuizAttempt } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function HistoryPage() {
  const router = useRouter()
  const [quizHistory, setQuizHistory] = useState<QuizAttempt[]>([])
  const [filteredHistory, setFilteredHistory] = useState<QuizAttempt[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttempt | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    // Clear cache to ensure we get fresh data
    clearQuizHistoryCache()

    // Only load history once when component mounts
    if (quizHistory.length === 0) {
      loadQuizHistory()
    }
  }, []) // Empty dependency array - only run once on mount

  const loadQuizHistory = () => {
    const history = getQuizHistory()
    if (history.length > 0) {
      // Sort by date (newest first)
      history.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Extract unique categories
      const uniqueCategories = [...new Set(history.map((item) => item.category))]

      setQuizHistory(history)
      setFilteredHistory(history)
      setCategories(uniqueCategories)
    }
  }

  // Separate useEffect for filtering to avoid infinite loops
  useEffect(() => {
    if (quizHistory.length > 0) {
      const filtered = quizHistory.filter((attempt) => {
        const nameMatch = (attempt.name || `${attempt.category} Quiz`).toLowerCase().includes(searchTerm.toLowerCase())
        const categoryMatch = categoryFilter === "all" || attempt.category === categoryFilter
        return nameMatch && categoryMatch
      })

      setFilteredHistory(filtered)
      setCurrentPage(1)
    }
  }, [searchTerm, categoryFilter, quizHistory])

  const handleDeleteAttempt = (attemptToDelete: QuizAttempt) => {
    if (window.confirm("Are you sure you want to delete this quiz attempt? This action cannot be undone.")) {
      const updatedHistory = quizHistory.filter(
        (attempt) =>
          !(
            attempt.date === attemptToDelete.date &&
            attempt.name === attemptToDelete.name &&
            attempt.category === attemptToDelete.category
          ),
      )

      localStorage.setItem("quizHistory", JSON.stringify(updatedHistory))
      // Clear cache before reloading
      clearQuizHistoryCache()
      setQuizHistory(updatedHistory)

      if (selectedAttempt === attemptToDelete) {
        setSelectedAttempt(null)
      }
    }
  }

  const handleReattemptQuiz = (attempt: QuizAttempt) => {
    if (attempt.results && attempt.results.length > 0) {
      // Extract quiz data from the attempt
      const quizData = attempt.results.map((result) => ({
        id: result.questionId,
        category: attempt.category,
        question: result.question,
        options: result.options,
        correctAnswer: result.correctAnswer,
        explanation: result.explanation,
      }))

      // Encode quiz data and navigate to quiz page
      const encodedData = encodeURIComponent(JSON.stringify(quizData))
      router.push(`/?reattempt=${encodedData}`)
    }
  }

  return (
    <Layout>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                className="lucide lucide-history"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M12 7v5l4 2" />
              </svg>
              Your Quiz History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedAttempt ? (
              <>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <HistoryList
                  filteredHistory={filteredHistory}
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                  onViewDetails={setSelectedAttempt}
                  onDeleteAttempt={handleDeleteAttempt}
                />
              </>
            ) : (
              <QuizDetails
                attempt={selectedAttempt}
                onBackToHistory={() => setSelectedAttempt(null)}
                onDeleteAttempt={handleDeleteAttempt}
                onReattemptQuiz={handleReattemptQuiz}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </Layout>
  )
}
