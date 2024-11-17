import { useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { addNewTest } from "./addTest.slice"
import { IQuestion, ITest } from "../types"


export const AddTest = () => {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState("")
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [shuffle, setShuffle] = useState(false)


  const addQuestion = () => {
    const newQuestion: IQuestion = {
      id: Date.now().toString(),
      text: "",
      options: [],
      correct: ""
    }
    setQuestions([...questions, newQuestion])
  }


  const addAnswer = (questionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? { ...question, options: [...question.options, ""] }
          : question
      )
    )
  }


  const updateQuestionText = (questionId: string, text: string) => {
    setQuestions(
      questions.map(question =>
        question.id == questionId ? { ...question, text } : question
      )
    )
  }


  const updateAnswerText = (questionId: string, answerIndex: number, text: string) => {
    setQuestions(
      questions.map((question) => question.id === questionId ?
            {
              ...question,
              options: question.options.map((opt, idx) => idx === answerIndex ? text : opt
              )
            }
          : question
      )
    )
  }


  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  }


  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find(question => question.id === questionId)
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString()
      }
      setQuestions([...questions, duplicatedQuestion])
    }
  }


  const setCorrectAnswer = (questionId: string, answer: string) => {
    setQuestions(
      questions.map(question => question.id === questionId ? { ...question, correct: answer } : question
      )
    )
  }


  const handleSubmit =  () => {
    if (!title.trim() && questions.length !== 0) {
      alert("Please write a title and one question.")
      return
    }
    const newTest: ITest = {
      id: Date.now().toString(),
      title,
      questions,
      results:[],
      shuffle
    }
    dispatch(addNewTest(newTest))
    setTitle("")
    setQuestions([])
    setShuffle(false)
    alert("Test is added!")
  }

  return (
    <>
      <h1>Add a New Test</h1>
      <label> Shuffle Questions
      <input
      type="checkbox"
      checked={shuffle}
      onChange={e => setShuffle(e.target.checked)}
      />
      </label>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-4 px-4 py-2 border rounded"
        />

        <div>
          {questions.map((question, qIndex) => (
            <div key={question.id} className="mb-6 border p-4 rounded">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(question.id, e.target.value)
                }
                className="mb-2 w-full px-4 py-2 border rounded"
              />

              {question.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      updateAnswerText(question.id, index, e.target.value)
                    }
                    className="mr-2 px-4 py-2 border rounded w-full"
                    onDoubleClick={() => setCorrectAnswer(question.id, option)}
                    style={{
                      backgroundColor:
                        question.correct === option ? "#c1e1c5" : "white"
                    }}
                  />
                  <button
                    type="button"
                    className="ml-2 text-red-600"
                    onClick={() =>
                      setQuestions(
                        questions.map(q => q.id == question.id
                            ? {
                                ...q,
                                options: q.options.filter((_, i) => i !== index)
                              }
                            : q
                        )
                      )
                    }
                  >
                    Delete Answer
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="mr-4 text-blue-600"
                onClick={() => addAnswer(question.id)}
              >
                Add Answer
              </button>
              <button
                type="button"
                className="mr-4 text-green-600"
                onClick={() => duplicateQuestion(question.id)}
              >
                Duplicate Question
              </button>
              <button
                type="button"
                className="text-red-600"
                onClick={() => deleteQuestion(question.id)}
              >
                Delete Question
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Add Question
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded mt-4 ml-4"
        >
          Submit Test
        </button>
      </form>
    </>
  );
};
