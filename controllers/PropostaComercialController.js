const HttpErrors = require('../HttpErrors');
const service = require('../Services/PropostaComercialService');

class PropostaComercialController {

    async salvar(req, res) {
		let validationErrors = await service.validate(req.body);

		if (validationErrors.length) {
			return HttpErrors.responseError(res, validationErrors);
		}

		let resultado = await service.save(req.body);
        return res.status(201).json(resultado);
    }

    async listar(req, res) {
		const resultado = await service.getAll();
        return res.status(200).json(resultado);
    }

    async buscarPorId(req, res) {
		const resultado = await service.getById(req.params.id);

		if (!resultado) {
			return HttpErrors.responseNotFound(res);
		}

        return res.status(200).json(resultado);
    }

    async atualizar(req, res) {
		const result = await service.getById(req.params.id);

		if (!result) {
			return HttpErrors.responseNotFound(res);
		}

		let validationErrors = await service.validate(req.body, true);

		if (validationErrors.length) {
			return HttpErrors.responseError(res, validationErrors);
		}

		let updated = await service.update(String(result._id), req.body);
        return res.status(200).json(updated);
    }

    async excluir(req, res) {
		const result = await service.getById(req.params.id);

		if (!result) {
			return HttpErrors.responseNotFound(res);
		}
	
        await service.delete(String(result._id));
        return res.status(204).send();
    }
}

module.exports = new PropostaComercialController();