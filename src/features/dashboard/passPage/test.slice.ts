import axios from "axios";
import { createAppSlice } from "../../../app/createAppSlice";
import { IState, ITest } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState:IState = {
    currentTest: null 
}

export const testSlice = createAppSlice({
    name:"tests",
    initialState,
    reducers: create => ({
        getTest: create.asyncThunk(
            async(id:string) => {
             const response = await axios.get("http://localhost:3004/tests/" + id)
             return response.data
            },
            {
             fulfilled: (state, action:PayloadAction<ITest[]>) => {
                 state.currentTest = action.payload 
             }
            }
         ),
         updateTest: create.asyncThunk(
            async (updatedTest: ITest) => {
              const response = await axios.patch("http://localhost:3004/tests/" + updatedTest.id, updatedTest)
              return response.data
            },
            {
              fulfilled: (state, action: PayloadAction<ITest>) => {
                state.currentTest = action.payload
              },
            }
          ),
    }),
    selectors: {
    currentTest: state => state.currentTest
    }
})

export const {getTest, updateTest} = testSlice.actions
export const {currentTest} = testSlice.selectors