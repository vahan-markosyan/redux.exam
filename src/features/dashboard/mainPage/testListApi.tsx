import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITest } from "../types";

export const TestListApi = createApi({
    reducerPath:"TestList",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3004"}),
    endpoints: builder => ({
        getTests: builder.query<ITest[], null>({
            query:() => "/tests"
        })
    })
})

export const { useGetTestsQuery } = TestListApi