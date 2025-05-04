"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { QuizInput } from "@/components/QuizInput"
import { QuizSection } from "@/components/QuizSection"
import { ResultsSection } from "@/components/ResultsSection"
import type { QuizData, UserAnswer } from "@/lib/types"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LayoutGrid, FileInput, History, Trophy, Sparkles } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [quizData, setQuizData] = useState<QuizData[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [currentCategory, setCurrentCategory] = useState<string>("")
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [currentView, setCurrentView] = useState<"input" | "quiz" | "results" | "home">("home")

  // Check for re-attempt data
  useEffect(() => {
    const reattemptData = searchParams.get("reattempt")
    if (reattemptData && currentView === "home") {
      try {
        const parsedData = JSON.parse(decodeURIComponent(reattemptData))
        setQuizData(parsedData)
        setUserAnswers(Array(parsedData.length).fill(null))
        setCurrentCategory(parsedData[0]?.category || "General")
        setCurrentView("quiz")
      } catch (error) {
        console.error("Error parsing re-attempt data:", error)
      }
    }
  }, [searchParams, currentView])

  const handleLoadQuiz = (data: QuizData[]) => {
    setQuizData(data)
    setUserAnswers(Array(data.length).fill(null))
    setCurrentCategory(data[0]?.category || "General")
    setCurrentView("quiz")
  }

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

  const handleResetQuiz = () => {
    setQuizData([])
    setUserAnswers([])
    setQuizResults([])
    setCurrentView("home")
  }

  const handleStartCustomQuiz = () => {
    setCurrentView("input")
  }

  const handleBrowseCategories = () => {
    router.push("/categories")
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
    <Layout>
      <main className="flex-1 container mx-auto px-4 py-8">
        {currentView === "home" && (
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 relative inline-block">
                Welcome to Quiz Master
                <motion.span
                  className="absolute -top-6 -right-6 text-yellow-500"
                  animate={{ rotate: [0, 20, 0, -20, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <Sparkles className="h-8 w-8" />
                </motion.span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Test your knowledge with our interactive quizzes on various programming topics
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={item}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <LayoutGrid className="h-6 w-6" />
                      </div>
                      Browse Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[calc(100%-88px)]">
                    <p className="mb-6 flex-grow">
                      Choose from our selection of pre-made quizzes on topics like Next.js, React, Node.js, and more.
                      Each category contains carefully crafted questions to test your knowledge.
                    </p>
                    <Button className="w-full" size="lg" onClick={handleBrowseCategories}>
                      View Categories
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={item}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <FileInput className="h-6 w-6" />
                      </div>
                      Custom Quiz
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[calc(100%-88px)]">
                    <p className="mb-6 flex-grow">
                      Upload your own JSON quiz data or paste it directly to create a custom quiz experience. Perfect
                      for creating specialized quizzes for your team or study group.
                    </p>
                    <Button className="w-full" size="lg" onClick={handleStartCustomQuiz}>
                      Create Custom Quiz
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
              <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/20 text-primary">
                        <Trophy className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">View Your Quiz History</h3>
                        <p className="text-muted-foreground">
                          Check your past quiz attempts and track your progress over time.
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={() => router.push("/history")}
                    >
                      <History className="mr-2 h-5 w-5" />
                      Quiz History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {currentView === "input" && <QuizInput onLoadQuiz={handleLoadQuiz} />}

        {currentView === "quiz" && (
          <QuizSection
            quizData={quizData}
            userAnswers={userAnswers}
            currentCategory={currentCategory}
            onAnswerChange={handleAnswerChange}
            onSubmitQuiz={handleSubmitQuiz}
          />
        )}

        {currentView === "results" && (
          <ResultsSection quizResults={quizResults} currentCategory={currentCategory} onTakeAnother={handleResetQuiz} />
        )}
      </main>
    </Layout>
  )
}
