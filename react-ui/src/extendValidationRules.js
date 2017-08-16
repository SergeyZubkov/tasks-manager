import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';

Object.assign(Validation.rules, {
	required: {
		rule: value => value.toString().trim(),
		hint: () => <span className="form-error is-visible">Заполните поле!</span>
	},
	email: {
		rule: value => validator.isEmail(value),
		hint: () => <span className="form-error is-visible">Указан некорректный Email</span>
	}
})