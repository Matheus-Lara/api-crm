var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    nome: String,
    cpfCnpj: String,
    cep: String,
    endereco: String,
    numero: String,
    cidade: String,
    UF: String,
    telefone: String,
    celular: String,
    email: String,
    facebook: String,
    infosAdicionais: String,
	tipo: {
		type: String,
		enum: ['F', 'J'],
		default: 'F'
	}
});

module.exports = mongoose.model('ClienteModel', ClienteSchema);