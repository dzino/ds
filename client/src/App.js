import { useReducer } from "react"
import axios from "axios"
import dateFormat from "dateformat"
import { TextField, Button, Box, Grid } from "@material-ui/core"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import DatePicker from "@mui/lab/DatePicker"
import "./App.css"

const initialState = {
  CardNumber: "",
  ExpDate: null,
  Cvv: "",
  Amount: "",
}

const reducer = (state, action) => {
  if (action.type === "reset") {
    return initialState
  }
  const result = { ...state }
  result[action.type] = action.value
  return result
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const validation = useValidation(state)
  const setPayment = useAPI(state, dispatch)
  return (
    <Grid className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ width: 500 }} m={5}>
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              label="Card Number"
              variant="outlined"
              value={state.CardNumber}
              onInput={(e) => {
                let value = e.target.value
                if (value.length <= 16)
                  dispatch({
                    type: "CardNumber",
                    value: +value < 0 ? "0" : value,
                  })
              }}
            />
          </Box>
          <Box mb={4}>
            <DatePicker
              views={["month", "year"]}
              inputFormat="MM/yyyy"
              label="Expiration Date"
              value={state.ExpDate}
              onChange={(newValue) => {
                dispatch({ type: "ExpDate", value: newValue })
              }}
              renderInput={(params) => (
                <TextField fullWidth {...params} helperText={null} />
              )}
            />
          </Box>
          <Box mb={4}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={100}
            >
              <TextField
                type="number"
                label="Amount"
                variant="outlined"
                value={state.Amount}
                onInput={(e) => {
                  let value = e.target.value
                  dispatch({ type: "Amount", value: +value < 0 ? "0" : value })
                }}
              />
              <TextField
                type="number"
                label="CVV"
                variant="outlined"
                value={state.Cvv}
                onInput={(e) => {
                  let value = e.target.value
                  if (value.length <= 3)
                    dispatch({ type: "Cvv", value: +value < 0 ? "0" : value })
                }}
              />
            </Grid>
          </Box>
          <Box mb={4}>
            <Button
              fullWidth
              style={{ fontSize: "20px" }}
              disabled={Object.values(validation).indexOf(false) !== -1}
              size="large"
              variant="contained"
              color="primary"
              onClick={setPayment}
            >
              Оплатить
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Grid>
  )
}

function useValidation(state) {
  const { CardNumber, ExpDate, Cvv, Amount } = state
  return {
    CardNumber: CardNumber.match(/^[0-9]{16,16}$/) ? true : false,
    ExpDate: ExpDate !== null,
    Cvv: Cvv.match(/^[0-9]{3,3}$/) ? true : false,
    Amount: Amount.match(/^[0-9]+$/) ? true : false,
  }
}

function useAPI(state, dispatch) {
  const { CardNumber, ExpDate, Cvv, Amount } = state
  const newPayment = {
    CardNumber,
    ExpDate: dateFormat(ExpDate, "mm/yyyy"),
    Cvv,
    Amount: +Amount,
  }
  return () => {
    axios.post("/api/payments", newPayment).then(function (response) {
      dispatch({ type: "reset" })
      alert(JSON.stringify(response.data))
    })
  }
}

export default App
