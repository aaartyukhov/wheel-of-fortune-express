const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateUserBody } = require('../middlewares/validatons');

router.post('/', validateUserBody, createUser);

module.exports = router;
