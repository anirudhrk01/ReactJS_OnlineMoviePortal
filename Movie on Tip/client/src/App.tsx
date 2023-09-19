import React from "react"
import { ToastContainer } from "react-toastify"
import "./App.css"

import NavigationBar from "./component/NavigationBar"

function App() {
  return (
    <>
      <NavigationBar />
      <ToastContainer />
    </>
  )
}

export default App