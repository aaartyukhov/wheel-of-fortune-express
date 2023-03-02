const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');
const Present = require('../models/presents');

const createPresent = (req, res, next) => {
  const { name, count } = req.body;
  Present.create({
    name, count,
  })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else if (err.code === 11000) {
        next(new ConflictError('Приз с данным name уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createPresent,
};
