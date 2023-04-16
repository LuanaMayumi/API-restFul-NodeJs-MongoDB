const router = require('express').Router()
const Person = require('../models/Person')


// CREATE - CRIAÇÃO DO BANCO DE DADOS

// post - insere no sistema
// recebe a requisição (os dados)
// transforma em algo
// e cria uma resposta final
// tenho que fazer uma interação com o banco de dados que pode demorar um tempo pra ter uma resposta
// para garantir que esse tempo seja respeitado antes de mandar uma resposta para o usuario criando uma função assincrona
router.post('/', async (req, res) => {
  // tenho acesso ao req, dentro do req tenho o body que é o corpo da requisição (.body) - onde recebo os dados
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({
      message: "O nome é obrigatorio"
    })
    return
  }
  // crio um objeto com os atributos que recebo da requisição
  // passo esse objeto pra ser inserido no banco
  const person = {
    name,
    salary,
    approved
  }
  // criar uma entidade no banco de dados
  // utilizando o método create do mongoose
  try {
    await Person.create(person)
    res.status(201).json({
      message: "Pessoa inserida no sistema com sucesso"
    })
  } catch (error) {
    // resposta com o stats de erro 500
    // enviar um json com a msg de error
    res.status(500).json({error: error})
  }
})


// READ - LEITURA DOS DADOS
router.get('/', async (req,res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// READ - CRIANDO UMA ROTA DINAMICA
router.get('/:id', async (req,res) => {
  console.log(req) // o objeto req é criado pelo express

  const { id } = req.params;
  try {
    const personById = await Person.findOne({_id: id})

    if (!personById) {
      res.status(422).json({
        message: "O usuário não foi encontrado "
      })
      return
    }
    res.status(200).json(personById)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

// UPDATE - ATUALIZAÇÃO DE DADOS (PUT, PATCH)
// PUT: espera que seja enviado o objeto completo para fazer a atualização no registro do sistema
// PATCH: atualiza parcialmente

router.patch('/:id', async (req,res) => {
  const { id } = req.params;
  const { name, salary, approved } = req.body;
  const person = {
    name, salary, approved,
  }
try {
  const updatedPerson = await Person.updateOne(
    {_id: id}, 
    person
  )
  console.log(updatedPerson)

  if(updatedPerson.matchedCount === 0) { // propriedade matchedCount - qtos registros foram atualizados
    // se atualizou 0, significa que nao deu certo a atualização
    res.status(422).json({
      message: "O usuário não foi encontrado "
    })
    return
  }
  res.status(200).json(person)

} catch (error) {
  res.status(500).json({error: error})
}
})

// DELETAR DADOS
router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  const personById = await Person.findOne({_id: id})

  if (!personById) {
    res.status(422).json({
      message: "O usuário não foi encontrado "
    })
    return
  }

  try {
    await Person.deleteOne({_id: id})
    res.status(200).json({message: "Usuário removido com sucesso"})
  } catch (error) {
    res.status(500).json({error: error})
  }
})
module.exports = router
