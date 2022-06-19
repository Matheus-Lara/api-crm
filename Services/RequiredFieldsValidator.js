

class RequiredFieldsValidator {
	validateForCreate(data, typesByField) {
		let errors = [];
		for (let requiredField of Object.keys(typesByField)) {
			let error = {};
			if (!data[requiredField]) {
				error[requiredField] = 'Campo obrigatório';
				errors.push(error);
			} else if (typesByField[requiredField] != typeof data[requiredField]) {
				error[requiredField] = 'Tipo de dado inválido. Informe um valor do tipo ' + typesByField[requiredField];
				errors.push(error);
			}
		}
		return errors;
	}

	validateForUpdate(data, typesByField) {
		let errors = [];
		for (let field of Object.keys(data)) {
			if (!data[field] && typesByField[field]) {
				errors.push({[field]: 'Campo obrigatório'});
			} else if (typesByField[field] && typeof data[field] != typesByField[field]) {
				errors.push({[field]: 'Tipo de dado inválido. Informe um valor do tipo ' + typesByField[field]});
			}
		}
		return errors;
	}
}

module.exports = new RequiredFieldsValidator();