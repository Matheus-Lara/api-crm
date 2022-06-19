var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CondicaoPagamentoSchema = new Schema({
    descricao: String,
    qtdPadraoDias: Number,
    qtdPadraoParcelas: Number
});

module.exports = mongoose.model('CondicaoPagamentoModel', CondicaoPagamentoSchema);