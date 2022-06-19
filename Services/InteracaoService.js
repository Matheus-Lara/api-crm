const RequiredFieldsValidator = require('./RequiredFieldsValidator');
const model = require('../models/InteracaoModel');
const clienteService = require('./ClienteService');

class InteracaoService {

	async getAll(idCliente) {
		return await model.find({idCliente: idCliente});
	}

	async getById(id) {
		if (String(id).length !== 24) {
			return null;
		}

		return await model.findOne({'_id': id});
	}

	async save(requestData) {
		delete requestData._id;
		return await model.create(requestData);
	}

	async update(id, requestData) {
		return await model.findByIdAndUpdate(id, requestData, {new: true});
	}

	async delete(id) {
		return await model.findByIdAndRemove(id);
	}

	async validate(data, updating = false) {
		let errors = [];
		let fieldsConfig = {
			'dataInteracao': 'string',
			'idCliente': 'string',
			'meioContato': 'string',
			'descricao': 'string',
			'clienteRespondeu': 'string'
		};

		if (!updating) {
			errors = RequiredFieldsValidator.validateForCreate(data, fieldsConfig);
		} else {
			errors = RequiredFieldsValidator.validateForUpdate(data, fieldsConfig);
		}

		if (data.clienteRespondeu && !['S', 'N'].includes(data.clienteRespondeu)) {
			errors.push({clienteRespondeu: 'O valor deve ser \'S\' ou \'N\''});
		}

		let cliente = await clienteService.getById(data.idCliente);
		if (!cliente) {
			errors.push({idCliente: 'O id do cliente informado não existe'});
		}

		return errors;
	}
}

module.exports = new InteracaoService();