const BadRequestError = require('../errors/bad-request-error');
const User = require('../models/user');

const createUser = (req, res, next) => {
  const { email } = req.body;
  User.create({
    email,
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
        User.find({
          email,
        }).then((data) => res.status(201).send(data[0]));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
};
