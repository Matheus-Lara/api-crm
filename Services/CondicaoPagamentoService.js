const RequiredFieldsValidator = require('./RequiredFieldsValidator');
const model = require('../models/CondicaoPagamentoModel');

class CondicaoPagamentoService {

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
			'descricao': 'string'
		};

		if (!updating) {
			errors = RequiredFieldsValidator.validateForCreate(data, fieldsConfig);
		} else {
			errors = RequiredFieldsValidator.validateForUpdate(data, fieldsConfig);
		}

		if (!Number.isInteger(data.qtdPadraoDias)) {
			errors.push({qtdPadraoDias: 'Deve ser fornecido um numero inteiro para a quantidade de dias'});
		}

		if (!Number.isInteger(data.qtdPadraoParcelas)) {
			errors.push({qtdPadraoParcelas: 'Deve ser fornecido um numero inteiro para a quantidade de parcelas'});
		}

		return errors;
	}
}

module.exports = new CondicaoPagamentoService();