const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
MongoClient.connect('mongodb+srv://crm-api:crm-api@cluster0.z9dho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(client => {
	const db = client.db('api-crm')

	const express = require('express');
	const app = express();
	const cors = require('cors');
	app.use(cors());
	app.use(express.json());
	app.listen(3000, () => {
		console.log('listening on 3000');
	});

	//rotas
	const baseApiPath = '/api';

	app.get(baseApiPath + '/clientes', (req, res) => {
		db.collection('clientes').find().toArray()
		.then(results => {
			res.send(results);
		})
		.catch(error => console.error(error));
	});

	app.get(baseApiPath + '/interactions/obterInteracoesCliente/:idCliente', (req, res) => {
		if (req.params.idCliente) {
			db.collection('interacoes').find({idCliente: parseInt(req.params.idCliente)}).toArray()
			.then(results => {
				res.send(results);
			})
			.catch(error => console.error(error));
		} else {
			res.json([]);
		}
	});

	app.get(baseApiPath + '/interactions/:idInteracao', (req, res) => {

		if (req.params.idInteracao) {
			db.collection('interacoes').find({idInteracao: parseInt(req.params.idInteracao)})
			.forEach(doc => res.send(doc));
		} else {
			res.json([]);
		}
	});

	app.put(baseApiPath + '/interactions/:idInteracao', (req, res) => {
		const id = req.body._id;
		delete req.body._id;
		req.body.idCliente = parseInt(req.body.idCliente);
		if (req.params.idInteracao) {
			db.collection('interacoes').updateOne({_id: ObjectID(id)}, {
				$set: {...req.body}
			}).then(result => {
				res.json([]);
			})
		} else {
			res.json([]);
		}
	});

}).catch(console.error)

