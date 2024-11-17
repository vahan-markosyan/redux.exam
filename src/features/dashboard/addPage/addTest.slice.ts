import axios from "axios";
import { createAppSlice } from "../../../app/createAppSlice";
import { IState, ITest } from "../types";
import { PayloadAction } from "@reduxjs/toolkit";


const initialState:IState = {
    currentTest:null
}

export const addTestSlice = createAppSlice({
    name:"adds",
    initialState,
    reducers: create => ({
        addNewTest: create.asyncThunk(
            async(test:ITest) => {
                const response = await axios.post("http://localhost:3004/tests", test)
                return response.data
            },
            {
                fulfilled: (state, action:PayloadAction<ITest>) => {
                    state.currentTest = action.payload
                }
            }
        )
    }),
    selectors: {
        currentTest: state => state.currentTest
    }

})

export const {addNewTest} = addTestSlice.actions
export const {currentTest} = addTestSlice.selectors