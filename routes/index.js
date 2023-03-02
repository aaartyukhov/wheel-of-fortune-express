const router = require('express').Router();
const presentsRouter = require('./presents');
const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use('/presents', presentsRouter);

module.exports = router;
