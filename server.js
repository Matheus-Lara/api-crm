require('./db/mongo');
const HttpErrors = require('./HttpErrors');

const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const produtoRouter = require('./routes/ProdutoRoute');
const clienteRouter = require('./routes/ClienteRoute');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({'extended': true}));
app.use(express.json());
app.use(cors());
app.use('/products', produtoRouter);
app.use('/customers', clienteRouter);

app.get('/', function(req, res) {
    res.send('Servidor respondeu...');
});

app.listen(3000, function() {
    console.log('listening to port 3000');
});

app.use(function(req, res) {
	res.status(404).json(HttpErrors.NOT_FOUND);
});
