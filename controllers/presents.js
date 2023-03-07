const NotFoundError = require('../errors/not-found-error');
const Present = require('../models/presents');

const createPresent = async (req, res, next) => {
  const { name, count, description } = req.body;
  try {
    const newPresent = await Present.create({ name, count, description });
    res.status(201).send(newPresent);
  } catch (error) {
    next(error);
  }
};

const deletePresent = async (req, res, next) => {
  const { id } = req.params;
  try {
    const present = await Present.findById(id);

    if (!present) {
      throw new NotFoundError('Приз не найден');
    }

    const deletedPresent = await Present.deleteOne(present);
    res.status(200).send(deletedPresent);
  } catch (error) {
    next(error);
  }
};

const getPresents = async (req, res, next) => {
  try {
    const presents = await Present.find({ });
    res.status(200).send(presents);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPresent,
  deletePresent,
  getPresents,
};
