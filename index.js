// config inicial
require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express() // variavel que vai inicializar o express
const Person = require('./models/Person')

// forma de ler JSON - se eu me comunicar por JSON, consigo ler e o express tbm consegue enviar JSON
// utilizar middlewares: são recursos executados entre as requisições e respostas atraves do EXPRESS
// app.use - cria um middleware
app.use(
  // inicio a configuração de leitura de JSON
  express.urlencoded({
    extended: true
  })
)
// para finalizar a leitura do JSON
app.use(
  express.json()
)

// ROTAS DA API
const personRoute = require('./routes/PersonRoute')
app.use("/person", personRoute)// inserir no express por meio de middleware
// tudo que vier do endpoint /person sera redirecionado para personRoute

// rota inicial / endpoint - para acessar no postman
// utiliza o GET para pegar algo do servidor
// recebe dois argumentos
// a rota / vai disponibilizar o (req,res)
app.get("/", (req,res) => {
// dou uma possibilidade para o express ler tudo o que vem na requisição (se o uruario enviar algum dado, consigo extrair e consigo utilizar a resposta)

// MOSTRAR REQ
// a resposta pra minha rota / vai ser um JSON
res.json({message: "Oi express!"})
})

// entregar uma porta para o express atualizar
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nrbx1vv.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
  // no caso ele fica escutando a 3000
  console.log("Conectamos ao MongoDB")
  app.listen(3000)

})
.catch((error) => console.log(error))
