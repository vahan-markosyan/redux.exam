import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import { SignIn } from "./features/login/sign.in"
import logo from "./logo.svg"

const App = () => {
  return (
    <div className="App">
      <SignIn/>
    </div>
  )
}

export default App
