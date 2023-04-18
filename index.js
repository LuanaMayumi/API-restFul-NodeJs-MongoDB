require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/Person')
const personRoute = require('./routes/PersonRoute')


const app = express() 

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(
  express.json()
)

app.use("/person", personRoute)

app.get("/", (req,res) => {
res.json({message: "Oi express!"})
})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nrbx1vv.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  console.log("Conectamos ao MongoDB")
  app.listen(3000)

})
.catch((error) => console.log(error))
