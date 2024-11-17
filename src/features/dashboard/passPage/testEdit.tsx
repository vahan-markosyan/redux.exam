import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { currentTest, getTest, updateTest } from "./test.slice"
import { useParams } from "react-router-dom"
import { ITest, IQuestion } from "../types"

export const TestEdit = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const current = useAppSelector(currentTest)
  const [editableTest, setEditableTest] = useState<ITest | null>(null)


  useEffect(() => {
    if (id) {
      dispatch(getTest(id))
    }
  }, [id])

  useEffect(() => {
    if (current) {
      setEditableTest({ ...current })
    }
  }, [current])

  const handleQuestionChange = (questionId: string, text: string) => {
    setEditableTest(prev => {
      if (!prev) //typescripti hamar
        return null
      const updatedQuestions = prev.questions.map(question =>
        question.id == questionId ? { ...question, text } : question
      )
      return { ...prev, questions: updatedQuestions }
    })
  }

  const handleOptionChange = (questionId: string, optionIndex: number, newOption: string) => {
    setEditableTest(prev => {
      if (!prev) 
        return null
      const updatedQuestions = prev.questions.map(question => {
        if (question.id === questionId) {
          const updatedOptions = [...question.options]
          updatedOptions[optionIndex] = newOption
          return { ...question, options: updatedOptions }
        }
        return question
      })
      return { ...prev, questions: updatedQuestions }
    })
  }

  const handleCorrectAnswerChange = (questionId: string, newAnswer: string) => {
    setEditableTest(prev => {
      if (!prev) 
        return null
      const updatedQuestions = prev.questions.map(question =>
        question.id == questionId ? { ...question, correct: newAnswer } : question
      )
      return {...prev, questions: updatedQuestions}
    })
  }

  const handleSave = () => {
    if (editableTest) {
      dispatch(updateTest(editableTest))
      alert("Test updated successfully!")
    }
  }

  if (!editableTest) 
  return <p>Loading...</p>

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Edit Test</h2>

      {editableTest.questions.map((question, qIndex) => (
        <div key={question.id} className="mb-6 bg-white p-4 shadow rounded">
          <input
            type="text"
            value={question.text}
            onChange={(e) => handleQuestionChange(question.id, e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={e =>
                  handleOptionChange(question.id, optIndex, e.target.value)
                }
                className="p-2 border rounded"
              />
            ))}
          </div>
          <div>
            <label className="block mb-2 font-medium">Correct Answer:</label>
            <input
              type="text"
              value={question.correct}
              onChange={(e) =>
                handleCorrectAnswerChange(question.id, e.target.value)
              }
              className="p-2 border rounded"
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSave}
        className="p-3 bg-green-500 text-white rounded"
      >
        Save Changes
      </button>
    </div>
  )
}
