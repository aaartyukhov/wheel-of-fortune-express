const router = require('express').Router();
const { createUser, getPresentUser, getUsers } = require('../controllers/users');
const { validateUserBody, validateObjId } = require('../middlewares/validatons');

router.get('/', getUsers);
router.post('/', validateUserBody, createUser);
router.get('/:id/get-present', validateObjId, getPresentUser);

module.exports = router;
