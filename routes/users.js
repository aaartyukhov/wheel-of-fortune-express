const router = require('express').Router();
const {
  createUser, getPresentUser, getUsers, deleteUser,
} = require('../controllers/users');
const { validateUserBody, validateObjId } = require('../middlewares/validators');

router.get('/', getUsers);
router.post('/', validateUserBody, createUser);
router.delete('/:id', validateObjId, deleteUser);
router.get('/:id/get-present', validateObjId, getPresentUser);

module.exports = router;
