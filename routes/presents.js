const router = require('express').Router();
const { createPresent, deletePresent, getPresents } = require('../controllers/presents');
const { validatePresentBody, validateObjId } = require('../middlewares/validatons');

router.get('/', getPresents);
router.post('/', validatePresentBody, createPresent);
router.delete('/:id', validateObjId, deletePresent);

module.exports = router;
