const RequiredFieldsValidator = require('./RequiredFieldsValidator');
const model = require('../models/PropostaComercialModel');
const produtoService = require('./ProdutoService');
const condicaoPagamentoService = require('./CondicaoPagamentoService');
const clienteService = require('./ClienteService');

class PropostaComercialService {

	async getAll() {
		const proposals = await model.find({});
		return await this.parseProposalsForListing(proposals);
	}

	async parseProposalsForListing(proposals) {
		let parsedProposals = [];
		for (let proposal of proposals) {
			let parsedProposal = {};
			let cliente = await clienteService.getById(proposal.idCliente);
			parsedProposal._id = proposal._id;
			parsedProposal.dataCriacao = proposal.dataCriacao.toISOString().substring(0, 10);
			parsedProposal.cliente = cliente.nome;
			parsedProposal.status = this.getParsedStatus(proposal.status);
			parsedProposal.valorTotal = proposal.valorTotal;
			parsedProposals.push(parsedProposal);
		}
		return parsedProposals;
	}

	getParsedStatus(status) {
		let objStatus = {
			'A': 'Aberta',
			'R': 'Recusada',
			'F': 'Fechada'
		};
		return objStatus[status];
	}

	async getById(id) {
		if (String(id).length !== 24) {
			return null;
		}
		return await model.findOne({'_id': id});
	}

	async save(requestData) {
		delete requestData._id;
		requestData.dataCriacao = new Date();
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
			'idCliente': 'string',
			'status': 'string',
			'idCondicaoPagamento': 'string',
			'valorTotal': 'number'
		};

		if (!updating) {
			errors = RequiredFieldsValidator.validateForCreate(data, fieldsConfig);
		} else {
			errors = RequiredFieldsValidator.validateForUpdate(data, fieldsConfig);
		}

		if (!errors.length) {
			return errors;
		}

		if (!['A', 'R', 'F'].includes(data.status)) {
			errors.push({status: 'O status informado é inválido, informe \'A\' (aberta), \'R\' (recusada) ou \'F\' (fechada)'});
		}

		let cliente = await clienteService.getById(data.idCliente);
		if (!cliente) {
			errors.push({idCliente: 'O cliente informado não existe'});
		}
		
		let condicaoPagamento = await condicaoPagamentoService.getById(data.idCondicaoPagamento);
		if (!condicaoPagamento) {
			errors.push({idCondicaoPagamento: 'A condição de pagamento informada não existe'});
		}

		if (!data.itens.length) {
			errors.push({itens: 'É necessário informar ao menos um item'});
		}

		if (data.itens && data.itens.length) {
			for (let item of data.itens) {
				let produto = await produtoService.getById(item.idProduto);
				if (!produto) {
					errors.push({['idProduto_' + item.idProduto]: 'O id do produto informado é inválido'});
				}

				if (item.quantidade <= 0) {
					errors.push({['quantidade_' + item.idProduto]: 'A quantidade informada deve ser maior que zero'});
				}

				if (item.valorUnitario <= 0) {
					errors.push({['valorUnitario_' + item.idProduto]: 'O valor unitário informado deve ser maior que zero'});
				}

				if (item.valorTotal <= 0) {
					errors.push({['valorTotal_' + item.idProduto]: 'O valor total informado deve ser maior que zero'});
				}

				if (errors.length) {
					break;
				}
			}
		}

		return errors;
	}
}

module.exports = new PropostaComercialService();