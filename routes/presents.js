const router = require('express').Router();
const { createPresent } = require('../controllers/presents');
const { validatePresentBody } = require('../middlewares/validatons');

router.post('/', validatePresentBody, createPresent);

module.exports = router;
