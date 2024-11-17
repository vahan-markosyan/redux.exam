import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { InputUser, IUser } from "./types"
import { addUser, getAllUsers, users } from "./users.slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";


export const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null)
    const [user, setUser] = useState<InputUser>()
    const userList = useAppSelector(users)


    useEffect(() => {
      dispatch(getAllUsers())
    },[])

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        if(user && user.nickname.trim() !== "") {
          const existingUser = userList.find(exuser => exuser.nickname == user.nickname )

          if(existingUser) {
            setError("The nickname is already taken")
            return
          }

            sessionStorage.setItem("nickname", user.nickname)
            navigate("/dashboard")
            dispatch(addUser({ nickname: user.nickname } as IUser))
        }
        setError("please enter a nickname")
        

    } 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, nickname: e.target.value })
        if (e.target.value.trim() !== "") {
            setError("")
          }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nickname"
                value={user?.nickname}
                onChange={handleChange}
                className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };