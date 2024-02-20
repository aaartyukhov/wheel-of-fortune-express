const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

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

const presentSchema = {
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'Поле "name" должно быть заполнено',
    }),
  count: Joi.number()
    .messages({
      'string.empty': 'Поле "count" должно быть заполнено',
    }),
  isInfinity: Joi.boolean()
    .required()
    .messages({
      'string.empty': 'Поле "isInfinity" должно быть заполнено',
    }),
};

const validatePresentBody = celebrate({
  body: Joi.object().keys(presentSchema),
});

const validatePresentsBody = celebrate({
  body: Joi.object().keys({
    presents: Joi.array().required().items(presentSchema),
  }),
});

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

module.exports = {
  validateUserBody,
  validatePresentBody,
  validateObjId,
  validatePresentsBody,
};
