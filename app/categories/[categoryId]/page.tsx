"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { QuizSection } from "@/components/QuizSection"
import { ResultsSection } from "@/components/ResultsSection"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { categories } from "@/lib/categories"
import type { QuizData, UserAnswer } from "@/lib/types"

export default function CategoryQuizPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.categoryId as string

  const [quizData, setQuizData] = useState<QuizData[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [currentView, setCurrentView] = useState<"loading" | "quiz" | "results" | "error">("loading")
  const [error, setError] = useState<string>("")

  // Find the category
  const category = categories.find((c) => c.id === categoryId)

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        // If category doesn't exist, show error
        if (!category) {
          setError("Category not found")
          setCurrentView("error")
          return
        }

        // Only load data if we're in loading state
        if (currentView === "loading") {
          // Load quiz data based on category
          const response = await fetch(`/api/quizzes/${categoryId}`)

          if (!response.ok) {
            throw new Error(`Failed to load quiz data: ${response.statusText}`)
          }

          const data = await response.json()

          if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Invalid quiz data format or empty quiz")
          }

          setQuizData(data)
          setUserAnswers(Array(data.length).fill(null))
          setCurrentView("quiz")
        }
      } catch (err) {
        console.error("Error loading quiz:", err)
        setError(err instanceof Error ? err.message : "Failed to load quiz")
        setCurrentView("error")
      }
    }

    loadQuizData()
  }, [categoryId, category, currentView])

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...userAnswers]
    newAnswers[questionIndex] = answerIndex
    setUserAnswers(newAnswers)
  }

  const handleSubmitQuiz = () => {
    const results = quizData.map((question, index) => {
      const selectedAnswer = userAnswers[index]
      const isCorrect = selectedAnswer === question.correctAnswer

      return {
        questionId: question.id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer: selectedAnswer,
        isCorrect,
        explanation: question.explanation,
      }
    })

    setQuizResults(results)
    setCurrentView("results")
  }

  const handleTakeAnother = () => {
    router.push("/categories")
  }

  if (currentView === "loading") {
    return (
      <Layout>
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </Layout>
    )
  }

  if (currentView === "error") {
    return (
      <Layout>
        <main className="flex-1 container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => router.push("/categories")}>Back to Categories</Button>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentView === "quiz" && (
          <QuizSection
            quizData={quizData}
            userAnswers={userAnswers}
            currentCategory={category?.name || "Quiz"}
            onAnswerChange={handleAnswerChange}
            onSubmitQuiz={handleSubmitQuiz}
          />
        )}

        {currentView === "results" && (
          <ResultsSection
            quizResults={quizResults}
            currentCategory={category?.name || "Quiz"}
            onTakeAnother={handleTakeAnother}
          />
        )}
      </main>
    </Layout>
  )
}
