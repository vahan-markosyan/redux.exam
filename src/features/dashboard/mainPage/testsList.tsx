import { Link, useNavigate } from "react-router-dom"
import { useGetTestsQuery } from "./testListApi"

export const TestList = () => {
  const { isLoading, error, data } = useGetTestsQuery(null)
  const navigate = useNavigate()

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-8">Tests</h1>

      <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors" onClick={() => navigate("/addTest")}>
        Add Test
      </button>

      {isLoading && (
        <p className="text-yellow-400 animate-pulse">Loading...</p>
      )}
      {error && (
        <p className="text-red-500">Error loading tasks</p>
      )}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(test => (
            <div
              key={test.id}
              className="bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-white text-lg font-semibold">{test.title}</p>

              <div className="flex gap-4 mt-4">
                <Link
                  to={`/test/pass/${test.id}`}
                  className="text-green-500 hover:text-green-400 underline"
                >
                  Pass
                </Link>
                <Link
                  to={`/test/edit/${test.id}`}
                  className="text-yellow-500 hover:text-yellow-400 underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

