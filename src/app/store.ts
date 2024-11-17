import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { TestListApi } from "../features/dashboard/mainPage/testListApi"
import { testSlice } from "../features/dashboard/passPage/test.slice"
import { addTestSlice } from "../features/dashboard/addPage/addTest.slice"
import { usersSlice } from "../features/login/users.slice"


const rootReducer = combineReducers({
  [TestListApi.reducerPath]:TestListApi.reducer,
  [testSlice.name]: testSlice.reducer,
  [addTestSlice.name]:addTestSlice.reducer,
  [usersSlice.name]:usersSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>


export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,

    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(TestListApi.middleware)
    },
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()


export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
