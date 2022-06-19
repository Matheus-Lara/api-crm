const RequiredFieldsValidator = require('./RequiredFieldsValidator');
const model = require('../models/ClienteModel');

class ClienteService {

	async getAll() {
		return await model.find({});
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

	validate(data, updating = false) {
		let errors = [];
		let fieldsConfig = {
			'tipo': 'string',
			'nome': 'string',
			'cpfCnpj': 'string',
			'cep': 'string',
			'endereco': 'string',
			'cidade': 'string',
			'UF': 'string',
			'celular': 'string'
		};

		if (!updating) {
			errors = RequiredFieldsValidator.validateForCreate(data, fieldsConfig);
		} else {
			errors = RequiredFieldsValidator.validateForUpdate(data, fieldsConfig);
		}

		if (data.tipo && !['F', 'J'].includes(data.tipo)) {
			errors.push({tipo: 'O tipo informado é inválido, informe \'J\' (pessoa jurídica) ou \'F\' (pessoa física)'});
		}

		return errors;
	}
}

module.exports = new ClienteService();