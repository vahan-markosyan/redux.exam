import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { addNewTest } from "./addTest.slice";
import { IQuestion, ITest } from "../types";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export const AddTest = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [error, setError] = useState("");

  const addQuestion = () => {
    const newQuestion: IQuestion = {
      id: Date.now().toString(),
      text: "",
      options: [],
      correct: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const addAnswer = (questionId: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? { ...question, options: [...question.options, ""] }
          : question
      )
    );
  };

  const updateQuestionText = (questionId: string, text: string) => {
    setQuestions(
      questions.map((question) =>
        question.id == questionId ? { ...question, text } : question
      )
    );
  };

  const updateAnswerText = (
    questionId: string,
    answerIndex: number,
    text: string
  ) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((opt, idx) =>
                idx === answerIndex ? text : opt
              ),
            }
          : question
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  const duplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find(
      (question) => question.id === questionId
    );
    if (questionToDuplicate) {
      const duplicatedQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString(),
      };
      setQuestions([...questions, duplicatedQuestion]);
    }
  };

  const setCorrectAnswer = (questionId: string, answer: string) => {
    setQuestions(
      questions.map((question) =>
        question.id === questionId ? { ...question, correct: answer } : question
      )
    );
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please write a title.");
      return;
    }
    if (questions.length === 0) {
      setError("Please add at least one question.");
      return;
    }
    setError("");
    const newTest: ITest = {
      id: Date.now().toString(),
      title,
      questions,
      results: [],
      shuffle,
    };
    dispatch(addNewTest(newTest));
    setTitle("");
    setQuestions([]);
    setShuffle(false);
    Toastify({
      text: "Test is added successfully!",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    }).showToast();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add a New Test</h1>
      {error && (
        <p className="text-red-500 text-sm font-semibold mb-4">{error}</p>
      )}

      <div className="mb-6">
        <label className="flex items-center space-x-2 text-gray-600">
          <input
            type="checkbox"
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
          <span>Shuffle Questions</span>
        </label>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Test Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {questions.map((question, qIndex) => (
          <div
            key={question.id}
            className="mb-6 border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
          >
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={question.text}
              onChange={(e) => updateQuestionText(question.id, e.target.value)}
              className="mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    updateAnswerText(question.id, index, e.target.value)
                  }
                  className={`mr-2 px-4 py-2 border ${
                    question.correct === option
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300"
                  } rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                  onDoubleClick={() => setCorrectAnswer(question.id, option)}
                />
                <button
                  type="button"
                  className="ml-2 text-sm text-red-500 hover:text-red-700"
                  onClick={() =>
                    setQuestions(
                      questions.map((q) =>
                        q.id == question.id
                          ? {
                              ...q,
                              options: q.options.filter((_, i) => i !== index),
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

            <div className="flex space-x-4 mt-2">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={() => addAnswer(question.id)}
              >
                Add Answer
              </button>
              <button
                type="button"
                className="text-green-500 hover:text-green-700"
                onClick={() => duplicateQuestion(question.id)}
              >
                Duplicate Question
              </button>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteQuestion(question.id)}
              >
                Delete Question
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-4"
        >
          Add Question
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none mt-4 ml-4"
        >
          Submit Test
        </button>
      </form>
    </div>
  );
};

