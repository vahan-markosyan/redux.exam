import axios from "axios"
import { createAppSlice } from "../../app/createAppSlice"
import { PayloadAction } from "@reduxjs/toolkit"
import { ISignInUser, IUser } from "./types"

const initialState: ISignInUser = {
    user: {
    id: "",
    nickname: sessionStorage.getItem("nickname") || "",    
    },
    list:[]
  }
  

export const usersSlice = createAppSlice({
    name:"users",
    initialState,
    reducers: create => ({
        addUser: create.asyncThunk(
            async(user:IUser) => {
             const response = await axios.post("http://localhost:3004/users", user)
             return response.data
            },
            {
             fulfilled: (state, action:PayloadAction<IUser>) => {
                 state.user = action.payload
             }
            },
         ),
         getAllUsers: create.asyncThunk(
            async() => {
                const response = await axios.get("http://localhost:3004/users")
                return response.data
               },
               {
                fulfilled: (state, action:PayloadAction<IUser[]>) => {
                    state.list = action.payload
                }
               }
         )
    }),
    selectors: {
    user: state => state.user,
    users: state => state.list
    }
})

export const {addUser, getAllUsers} = usersSlice.actions
export const {user, users} = usersSlice.selectors