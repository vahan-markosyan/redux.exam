import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "./features/login/sign.in"
import { TestList } from "./features/dashboard/mainPage/testsList"
import { TestPass } from "./features/dashboard/passPage/testPass"
import { TestResults } from "./features/dashboard/passPage/testResults"
import { AddTest } from "./features/dashboard/addPage/addTest"
import { TestEdit } from "./features/dashboard/passPage/testEdit"

const routes = createBrowserRouter([
  {
    path:"",
    element:<SignIn/>
  },
  {
    path:"/dashboard",
    element:<TestList/>,
  },
  {
    path:"/test/pass/:id",
    element:<TestPass/>
  },
  {
    path:"/test/edit/:id",
    element:<TestEdit/>
  },
  {
    path:"/test/results/:user/:id",
    element:<TestResults/>
  },
  {
    path:"/addTest",
    element:<AddTest/>
  }
])

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>  
      <Provider store={store}>
      <RouterProvider router={routes}>
        </RouterProvider>
      </Provider>   
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
