var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InteracaoSchema = new Schema({
	dataInteracao: Date,
	idCliente: String,
	meioContato: String,
	descricao: String,
	clienteRespondeu: Boolean
});

module.exports = mongoose.model('InteracaoModel', InteracaoSchema);