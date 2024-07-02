import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signup } from "./Pages/Signup"
import { Signin } from "./Pages/Signin"
import { Dashboard } from "./Pages/Dashboard"
import { SendMoney } from "./Pages/SendMoney"
import { UserContextProvider } from "../context/userContext"
import { Home } from "./Pages/Home"


function App() {

  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/send" element={<SendMoney/>}/>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
