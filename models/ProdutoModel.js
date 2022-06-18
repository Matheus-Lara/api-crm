var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
    codigo: Number,
    nome: String,
    desc: String,
    preco: Number,
	tipo: {
		type: String,
		enum: ['S', 'P'],
		default: 'P'
	}
});

module.exports = mongoose.model('ProdutoModel', ProdutoSchema);