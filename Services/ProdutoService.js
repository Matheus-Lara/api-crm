const RequiredFieldsValidator = require('./RequiredFieldsValidator');
const model = require('../models/ProdutoModel');

class ProdutoService {

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
		requestData.codigo = await this.getNextCodigo();
		return await model.create(requestData);
	}

	async update(id, requestData) {
		delete requestData.codigo;
		return await model.findByIdAndUpdate(id, requestData, {new: true});
	}

	async delete(id) {
		return await model.findByIdAndRemove(id);
	}

	validate(data, updating = false) {
		let errors = [];
		let fieldsConfig = {
			'nome': 'string',
			'desc': 'string',
			'tipo': 'string',
			'preco': 'number'
		};

		if (!updating) {
			errors = RequiredFieldsValidator.validateForCreate(data, fieldsConfig);
		} else {
			errors = RequiredFieldsValidator.validateForUpdate(data, fieldsConfig);
		}

		if (data.tipo && !['S', 'P'].includes(data.tipo)) {
			errors.push({tipo: 'O tipo informado é inválido, informe \'S\' (serviço) ou \'P\' (produto)'});
		}

		return errors;
	}

	async getNextCodigo() {
		const max = await model.findOne({}).sort({codigo: -1});
		return max == null ? 1 : max.codigo + 1;
	}
}

module.exports = new ProdutoService();