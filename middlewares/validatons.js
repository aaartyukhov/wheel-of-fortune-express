const { Joi, celebrate } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validatePresentBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .messages({
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
    count: Joi.number()
      .required()
      .messages({
        'string.empty': 'Поле "count" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateUserBody,
  validatePresentBody,
};
