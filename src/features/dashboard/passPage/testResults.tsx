import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getTest, currentTest } from "./test.slice"

export const TestResults = () => {
  const { id, user } = useParams<{ id: string; user: string }>()
  const dispatch = useAppDispatch()
  const test = useAppSelector(currentTest)

  useEffect(() => {
    if (id) {
      dispatch(getTest(id))
    }
  }, [id])
  

  useEffect(() => {
    console.log(test?.results)
  }, [])


  const userResult = test?.results?.find(result => result.user == user)

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Test Results</h1>

      {test && userResult ? (
        <>
          <p className="text-lg mb-4">
            <span className="font-bold">User:</span> {user}
          </p>
          <p className="text-lg mb-4">
            <span className="font-bold">Test Title:</span> {test.title}
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Score: {userResult.score} out of {test.questions.length}
          </h2>

          <div className="space-y-6">
            {test.questions.map((question, index) => (
              <div key={question.id} className="bg-white shadow-md rounded-lg p-6">
                <p className="text-lg font-medium mb-4">{question.text}</p>
                <p
                  className={`p-3 rounded-md ${
                    userResult.answers[index] == question.correct
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Your Answer: {userResult.answers[index]}
                </p>
                <p className="mt-2 text-gray-700">
                  Correct Answer: {question.correct}
                </p>
              </div>
            ))}
          </div>
          <Link to="/dashboard" className="mt-6 block text-blue-500 underline">
            Back to Tests
          </Link>
        </>
      ) : (
        <p className="text-center text-xl text-red-600 mt-10">You have 0 right answer, try again!</p>
      )}
    </div>
  )
}
