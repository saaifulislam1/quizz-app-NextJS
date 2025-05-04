import { NextResponse } from "next/server"
import { nextjsQuiz } from "@/lib/quiz-data/nextjs-quiz"
import { nodejsQuiz } from "@/lib/quiz-data/nodejs-quiz"
import { expressQuiz } from "@/lib/quiz-data/express-quiz"
import { reactQuiz } from "@/lib/quiz-data/react-quiz"

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
  const categoryId = params.categoryId

  // Return the appropriate quiz data based on category
  switch (categoryId) {
    case "nextjs":
      return NextResponse.json(nextjsQuiz)
    case "nodejs":
      return NextResponse.json(nodejsQuiz)
    case "express":
      return NextResponse.json(expressQuiz)
    case "react":
      return NextResponse.json(reactQuiz)
    default:
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
  }
}
