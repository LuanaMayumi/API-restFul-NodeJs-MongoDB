const router = require('express').Router()
const Person = require('../models/Person')


router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({
      message: "O nome é obrigatorio"
    })
    return
  }
 
  const newPerson = {
    name,
    salary,
    approved
  }

  try {
    const person = await Person.create(newPerson)
    res.status(201).json({
      message: "Pessoa inserida no sistema com sucesso",
      person
    })
  } catch (error) {
    res.status(500).json({error: error})
  }
})


router.get('/', async (req,res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({error: error})
  }
})


router.get('/:id', async (req,res) => {
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
    // propriedade matchedCount - qtos registros foram atualizados
    // se atualizou 0, significa que nao deu certo a atualização
  if(updatedPerson.matchedCount === 0) { 
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
