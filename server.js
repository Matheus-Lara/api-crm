require('./db/mongo');

//imports
const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const produtoRouter = require('./routes/ProdutoRoute');

//configurações
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({'extended': true}));
app.use(express.json());
app.use(cors());
app.use('/produtos', produtoRouter);

//métodos http
app.get('/', function(req, res) {
    res.send("Servidor respondeu...");
});

//iniciar servidor
app.listen(3000, function(){
    console.log("Servidor rodando em localhost:3000");
});
