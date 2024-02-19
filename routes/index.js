const router = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const presentsRouter = require('./presents');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/presents', presentsRouter);

router.use('*', (req, res, next) => {
  try {
    throw new NotFoundError('Путь не найден');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
