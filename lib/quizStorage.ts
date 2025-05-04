import type { QuizAttempt } from "./types"

// Add a memoization mechanism to prevent unnecessary re-renders
let cachedHistory: QuizAttempt[] | null = null

// Get quiz history from localStorage
export function getQuizHistory(): QuizAttempt[] {
  if (typeof window === "undefined") return []

  // Return cached history if available
  if (cachedHistory !== null) {
    return cachedHistory
  }

  try {
    const history = localStorage.getItem("quizHistory")
    cachedHistory = history ? JSON.parse(history) : []
    return cachedHistory
  } catch (error) {
    console.error("Error retrieving quiz history:", error)
    return []
  }
}

// Save a quiz attempt to localStorage
export function saveQuizAttempt(attempt: QuizAttempt): void {
  if (typeof window === "undefined") return

  try {
    const history = getQuizHistory()
    history.push(attempt)
    localStorage.setItem("quizHistory", JSON.stringify(history))
    // Update cache
    cachedHistory = history
  } catch (error) {
    console.error("Error saving quiz attempt:", error)
    throw new Error("Failed to save quiz attempt")
  }
}

// Delete a quiz attempt from localStorage
export function deleteQuizAttempt(attemptToDelete: QuizAttempt): void {
  if (typeof window === "undefined") return

  try {
    const history = getQuizHistory()
    const updatedHistory = history.filter(
      (attempt) =>
        !(
          attempt.date === attemptToDelete.date &&
          attempt.name === attemptToDelete.name &&
          attempt.category === attemptToDelete.category
        ),
    )

    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory))
    // Update cache
    cachedHistory = updatedHistory
  } catch (error) {
    console.error("Error deleting quiz attempt:", error)
    throw new Error("Failed to delete quiz attempt")
  }
}

// Add a function to clear the cache (useful when we want to force a refresh)
export function clearQuizHistoryCache(): void {
  cachedHistory = null
}
