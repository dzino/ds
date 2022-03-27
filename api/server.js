"use strict"

const express = require("express")
// const cors = require("cors")
const MongoClient = require("mongodb").MongoClient

// константы
const MONGO_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME
const MONGO_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const port = 3001
const host = "0.0.0.0"

// приложение
const app = express()
const jsonParser = express.json()
// app.use(cors())

// mongodb
const mongoClient = new MongoClient(
  `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@db:27017/`
)

mongoClient.connect(function (err, client) {
  if (err) return console.log(err)

  app.locals.collection = client.db("paymentsdb").collection("payments")

  app.listen(port, host)
  console.log(`running on http://${host}:${port}`)
})

app.get("/api/payments", (req, res) => {
  req.app.locals.collection.find({}).toArray(function (err, payments) {
    if (!err) res.send(payments)
  })
})

app.post("/api/payments", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)

  const user = {
    CardNumber: req.body.CardNumber,
    ExpDate: req.body.ExpDate,
    Cvv: req.body.ExpDate,
    Amount: req.body.Amount,
  }

  req.app.locals.collection.insertOne(user, function (err, result) {
    if (err) return console.log(err)

    res.send({ RequestId: result.insertedId, Amount: user.Amount })
  })
})
