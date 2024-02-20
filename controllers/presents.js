const NotFoundError = require('../errors/not-found-error');
const Present = require('../models/presents');

const createPresent = async (req, res, next) => {
  const { name, count, isInfinity } = req.body;
  try {
    const newPresent = await Present.create({ name, count, isInfinity });
    res.status(201).send(newPresent);
  } catch (error) {
    next(error);
  }
};

const createPresents = async (req, res, next) => {
  const { presents } = req.body;
  try {
    const newPresents = await Present.insertMany(presents);
    res.status(201).send(newPresents);
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
  createPresents,
  deletePresent,
  getPresents,
};
