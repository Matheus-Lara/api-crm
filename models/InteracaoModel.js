var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InteracaoSchema = new Schema({
	dataInteracao: Date,
	idCliente: String,
	meioContato: String,
	descricao: String,
	clienteRespondeu: {
		type: String,
		enum: ['S', 'N']
	}
});

module.exports = mongoose.model('InteracaoModel', InteracaoSchema);