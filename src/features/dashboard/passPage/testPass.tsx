import { useParams, Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { currentTest, getTest, updateTest } from "./test.slice"
import { useEffect, useState, useRef } from "react"

interface SelectedOptions {
  [questionId: string]: string
}

export const TestPass = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const current = useAppSelector(currentTest)
  const user = sessionStorage.getItem("nickname")

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [score, setScore] = useState<number | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [questions, setQuestions] = useState(current?.questions || [])
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  const shuffleArray = (array:any[]) => {
    return array
      .map(item => ({...item, shuffle: Math.random()}))
      .sort((a,b) => a.shuffle - b.shuffle)
      .map(({sort, ...item}) => item)
  }


  useEffect(() => {
    if (id) {
      dispatch(getTest(id))
    }
  }, [id])

  useEffect(() => {
    if (current?.questions) {
      const updatedQuestions = current.shuffle ? shuffleArray(current.questions) : current.questions
      setQuestions(updatedQuestions)
    }
  },[current])


  const handleOptionSelect = (questionId: string, option: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: option,
    }))
  }

 
  const handleSubmit = async () => {
    let firstUnansweredIndex: number | null = null

    current?.questions.forEach((question, index) => {
      const selectedAnswer = selectedOptions[question.id]
      if (!selectedAnswer && firstUnansweredIndex == null) {
        firstUnansweredIndex = index
      }
    })

    if (firstUnansweredIndex !== null) {
      questionRefs.current[firstUnansweredIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      alert("Please complete all questions before submitting!")
      return
    }

    let correctAnswers = 0
    const userAnswers: string[] = []
    current?.questions.forEach(question => {
      const selectedAnswer = selectedOptions[question.id]
      if (selectedAnswer == question.correct) {
        correctAnswers++
      }
      userAnswers.push(selectedAnswer || "")
    })

    const finalScore = correctAnswers
    setScore(finalScore)
    setAnswers(userAnswers)

    
    if (user && current) {
      const updatedTest = {
        ...current,
        results: [...current.results, { user, answers: userAnswers, score: finalScore }],
      }
      dispatch(updateTest(updatedTest))
    }
  }

  

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      {current ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Test Details</h2>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Title:</span> {current.title}
            </p>
            <label>
              <input
                type="checkbox"
                checked={current.shuffle}
              />
              Shuffle Questions
            </label>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={question.id}
                ref={(el) => (questionRefs.current[index] = el)}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <p className="text-lg font-medium mb-4">{question.text}</p>
                <div className="grid grid-cols-2 gap-4">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => handleOptionSelect(question.id, option)}
                      className={`p-3 rounded-md border transition-colors ${
                        selectedOptions[question.id] === option
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800 hover:bg-blue-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 p-3 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>

          {score !== null && (
            <div className="mt-6 bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">
                You scored {score} out of {current?.questions.length}.
              </h3>
              <Link
                to={`/test/results/${user}/${id}`}
                className="text-blue-500 underline mt-4 block"
              >
                View results
              </Link>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-xl text-red-600 mt-10">No test found</p>
      )}
    </div>
  );
};




