var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProdutoSchema = new Schema({
    codigo: Number,
    nome: String,
    desc: String,
    preco: Number,
	servico: Boolean
});

module.exports = mongoose.model('ProdutoModel', ProdutoSchema);