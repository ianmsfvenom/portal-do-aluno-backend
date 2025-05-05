const router = require('express').Router();
const loginController = require('../controllers/LoginController');  
const loginValidator = require('../validators/LoginValidator');


router.get('/', loginController.index);
router.post('/', loginValidator.makeLogin, loginController.makeLogin);
router.get('/check-login', loginController.checkLogin);

module.exports = router;