require('./db/mongo');

const exp = require('constants');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const produtoRouter = require('./routes/ProdutoRoute');

const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({'extended': true}));
app.use(express.json());
app.use(cors());
app.use('/produtos', produtoRouter);

app.get('/', function(req, res) {
    res.send('Servidor respondeu...');
});

app.listen(3000, function() {
    console.log('listening to port 3000');
});
