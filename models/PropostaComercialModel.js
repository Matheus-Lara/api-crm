var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PropostaComercialSchema = new Schema({
    dataCriacao: Date,
    idCliente: String,
    status: {
		type: String,
		enum: ['A', 'R', 'F'], // Aberta - Recusada - Fechada
		default: 'A'
	},
	idCondicaoPagamento: String,
	itens: [{
		idProduto: String,
		quantidade: Number,
		valorUnitario: Number,
		valorTotal: Number
	}],
	desconto: Number,
	valorTotal: Number,
	observacoes: String
});

module.exports = mongoose.model('PropostaComercialModel', PropostaComercialSchema);