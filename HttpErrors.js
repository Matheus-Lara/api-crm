
class HttpErrors {
	NOT_FOUND = {
		type: 'NOT_FOUND',
		title: 'Não encontrado',
		message: 'Recurso não encontrado, verifique sua URL e tente novamente'
	};

	VALIDATION_ERROR = {
		type: 'VALIDATION_ERROR',
		title: 'Requisição inválida',
		message: 'Não foi possível salvar os dados, pois houveram problemas em sua validação',
		fields: []
	};

	responseNotFound(res) {
		return res.status(404).json(this.NOT_FOUND);
	}

	responseError(res, fields) {
		this.VALIDATION_ERROR.fields = fields;
		return res.status(400).json(this.VALIDATION_ERROR);
	}

}


module.exports = new HttpErrors();