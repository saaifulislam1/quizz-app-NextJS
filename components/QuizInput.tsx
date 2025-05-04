"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { QuizData } from "@/lib/types"

interface QuizInputProps {
  onLoadQuiz: (data: QuizData[]) => void
}

export function QuizInput({ onLoadQuiz }: QuizInputProps) {
  const [jsonText, setJsonText] = useState("")
  const [fileName, setFileName] = useState("No file chosen")
  const [error, setError] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setJsonText(content)
      }
      reader.readAsText(file)
    }
  }

  const handleLoadQuiz = () => {
    try {
      // Clear previous error
      setError("")

      // Get JSON data from textarea
      const jsonData = jsonText.trim()
      if (!jsonData) {
        throw new Error("Please provide JSON quiz data")
      }

      // Parse JSON
      const quizData = JSON.parse(jsonData)

      // Validate quiz data
      if (!Array.isArray(quizData) || quizData.length === 0) {
        throw new Error("Invalid quiz data format. Expected a non-empty array.")
      }

      // Check if each question has required fields
      for (const question of quizData) {
        if (
          !question.id ||
          !question.question ||
          !question.options ||
          !Array.isArray(question.options) ||
          question.options.length === 0 ||
          question.correctAnswer === undefined ||
          !question.explanation
        ) {
          throw new Error(
            "Invalid question format. Each question must have id, question, options array, correctAnswer, and explanation.",
          )
        }
      }

      // Pass the quiz data to parent component
      onLoadQuiz(quizData)
    } catch (error) {
      setError((error as Error).message)
    }
  }

  return (
    <Card className="mb-6">
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
            className="lucide lucide-file-input"
          >
            <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M2 15h10" />
            <path d="m9 18 3-3-3-3" />
          </svg>
          Input Quiz Data
        </CardTitle>
        <CardDescription>Upload a JSON file or paste your quiz data below to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="json-file"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md cursor-pointer w-fit hover:bg-primary/90 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-upload"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                Upload JSON File
              </label>
              <input type="file" id="json-file" accept=".json" className="hidden" onChange={handleFileUpload} />
              <span className="text-sm text-gray-500 dark:text-gray-400">{fileName}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="json-text" className="flex items-center gap-2 text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-keyboard"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
                <path d="M6 8h.001" />
                <path d="M10 8h.001" />
                <path d="M14 8h.001" />
                <path d="M18 8h.001" />
                <path d="M8 12h.001" />
                <path d="M12 12h.001" />
                <path d="M16 12h.001" />
                <path d="M7 16h10" />
              </svg>
              Or Paste JSON Data:
            </label>
            <Textarea
              id="json-text"
              rows={8}
              placeholder="Paste your JSON quiz data here..."
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="font-mono"
            />
          </div>

          <details className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
            <summary className="flex items-center gap-2 cursor-pointer font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-lightbulb"
              >
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </svg>
              Sample JSON Format
            </summary>
            <pre className="mt-2 p-3 bg-gray-800 text-gray-100 rounded-md overflow-x-auto text-xs">
              {`[
  {
    "id": 1,
    "category": "Next.js",
    "question": "What is the primary purpose of Next.js's getStaticProps function?",
    "options": [
      "To fetch data at runtime for each request",
      "To fetch data at build time for static generation",
      "To authenticate users before page load",
      "To redirect users to different pages"
    ],
    "correctAnswer": 1,
    "explanation": "getStaticProps allows you to fetch data at build time, making it available as props to the page component. This enables static generation (SSG) where pages are pre-rendered during build, improving performance and SEO."
  }
]`}
            </pre>
          </details>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button onClick={handleLoadQuiz} className="w-full sm:w-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play mr-2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Load Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
