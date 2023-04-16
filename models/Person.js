const mongoose = require('mongoose');

// criar uma entidade especial que vai me fornecer métodos para salvar, ler e atualizar dados
// é necessário exportar e importar no index

const Person = mongoose.model('Person', {
  name: String,
  salary: Number,
  approved: Boolean,
})

module.exports = Person;