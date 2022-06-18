

class RequiredFieldsValidator {
	validate(data, typesByField, validateOnlyTypes) {
		let errors = [];
		for (let requiredField of Object.keys(typesByField)) {
			let error = {};
			if (!data[requiredField] && !validateOnlyTypes) {
				error[requiredField] = 'Campo obrigatório';
				errors.push(error);
			} else if (data[requiredField] && typesByField[requiredField] != typeof data[requiredField]) {
				error[requiredField] = 'Tipo de dado inválido. Informe um valor do tipo ' + typesByField[requiredField];
				errors.push(error);
			}
		}
		return errors;
	}
}

module.exports = new RequiredFieldsValidator();