const ConflictError = require('../errors/conflict-error');
const Present = require('../models/presents');

const createPresent = async (req, res, next) => {
  const { name, count } = req.body;
  try {
    const newPresent = await Present.create({ name, count });
    res.status(201).send(newPresent);
  } catch (error) {
    if (error.code === 11000) {
      next(new ConflictError('Приз с данным name уже существует'));
    } else {
      next(error);
    }
  }
};

module.exports = {
  createPresent,
};
