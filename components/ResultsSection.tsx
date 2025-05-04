"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { saveQuizAttempt } from "@/lib/quizStorage"
import { motion } from "framer-motion"
import { Save, Redo, History, CheckCircle, XCircle, Trophy, Star } from "lucide-react"
import confetti from "canvas-confetti"

interface ResultsSectionProps {
  quizResults: any[]
  currentCategory: string
  onTakeAnother: () => void
}

export function ResultsSection({ quizResults, currentCategory, onTakeAnother }: ResultsSectionProps) {
  const router = useRouter()
  const [attemptName, setAttemptName] = useState("")
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSaved, setIsSaved] = useState(false)

  const correctAnswers = quizResults.filter((result) => result.isCorrect).length
  const totalQuestions = quizResults.length
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)

  // Trigger confetti effect on component mount
  useEffect(() => {
    if (percentage >= 70) {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#4361ee", "#7209b7", "#f72585"],
        })
      }, 500)
    }
  }, [percentage])

  const handleSaveAttempt = () => {
    try {
      const name = attemptName.trim() || `${currentCategory} Quiz`

      saveQuizAttempt({
        name,
        category: currentCategory,
        date: new Date().toISOString(),
        correct: correctAnswers,
        total: totalQuestions,
        percentage,
        results: quizResults,
      })

      setSaveStatus({
        type: "success",
        message: "Quiz attempt saved successfully!",
      })

      setIsSaved(true)

      // Clear the status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null)
      }, 3000)
    } catch (error) {
      setSaveStatus({
        type: "error",
        message: "Error saving quiz attempt. Please try again.",
      })
    }
  }

  const handleViewHistory = () => {
    router.push("/history")
  }

  const getScoreColor = () => {
    if (percentage >= 80) return "from-green-500 to-green-600"
    if (percentage >= 60) return "from-yellow-500 to-yellow-600"
    return "from-red-500 to-red-600"
  }

  const getScoreMessage = () => {
    if (percentage >= 90) return "Excellent! You're a master!"
    if (percentage >= 80) return "Great job! You know your stuff!"
    if (percentage >= 70) return "Good work! Keep learning!"
    if (percentage >= 60) return "Not bad! Room for improvement."
    return "Keep studying! You'll get better!"
  }

  const getScoreIcon = () => {
    if (percentage >= 80) return <Trophy className="h-8 w-8 text-yellow-500" />
    if (percentage >= 60) return <Star className="h-8 w-8 text-blue-500" />
    return <XCircle className="h-8 w-8 text-red-500" />
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="mb-6 overflow-hidden border-t-4 border-t-primary">
        <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              {percentage >= 60 ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            </div>
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative mb-6">
              <div
                className={`w-44 h-44 rounded-full bg-gradient-to-br ${getScoreColor()} text-white flex items-center justify-center text-5xl font-bold shadow-lg`}
              >
                {percentage}%
              </div>
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md"
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                {getScoreIcon()}
              </motion.div>
            </div>
            <p className="text-xl mb-2">
              Correct answers:{" "}
              <span className="font-semibold">
                {correctAnswers}/{totalQuestions}
              </span>
            </p>
            <p
              className={`text-lg font-medium ${percentage >= 80 ? "text-green-600 dark:text-green-400" : percentage >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}
            >
              {getScoreMessage()}
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-6 rounded-lg mb-8 border border-primary/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Save className="h-5 w-5 text-primary" />
              Save Your Attempt
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="attempt-name" className="text-sm font-medium">
                  Name this attempt:
                </label>
                <Input
                  id="attempt-name"
                  placeholder={`e.g., ${currentCategory} Basics Quiz #1`}
                  value={attemptName}
                  onChange={(e) => setAttemptName(e.target.value)}
                  disabled={isSaved}
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <Button onClick={handleSaveAttempt} disabled={isSaved} className="w-full sm:w-auto" size="lg">
                <Save className="mr-2 h-5 w-5" />
                Save Attempt
              </Button>

              {saveStatus && (
                <Alert variant={saveStatus.type === "success" ? "default" : "destructive"} className="animate-fadeIn">
                  <AlertDescription>{saveStatus.message}</AlertDescription>
                </Alert>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="outline" onClick={onTakeAnother} size="lg" className="gap-2">
              <Redo className="h-5 w-5" />
              Take Another Quiz
            </Button>
            <Button
              onClick={handleViewHistory}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
            >
              <History className="h-5 w-5" />
              View History
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
