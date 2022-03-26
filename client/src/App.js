import { useEffect } from "react"
import axios from "axios"
import logo from "./logo.svg"
import "./App.css"

function App() {
  const setPayment = useAPI()

  useEffect(setPayment, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

function useAPI() {
  return () => {
    axios
      // .post("http://127.0.0.1:8080/api/payments", {
      //   CardNumber: "0000000000000000",
      //   ExpDate: "04/2022",
      //   Cvv: "123",
      //   Amount: 100,
      // })
      .get("http://127.0.0.1:8080/api/payments")
      .then(function (response) {
        console.log(response.data)
      })
  }
}

export default App
