const router = require('express').Router();
const { deletePresent, getPresents, createPresents } = require('../controllers/presents');
const { validateObjId, validatePresentsBody } = require('../middlewares/validators');

router.get('/', getPresents);
// router.post('/', validatePresentBody, createPresent);
router.post('/', validatePresentsBody, createPresents);
router.delete('/:id', validateObjId, deletePresent);

module.exports = router;
