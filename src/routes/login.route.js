const router = require('express').Router();
const loginController = require('../controllers/LoginController');  
const loginValidator = require('../validators/LoginValidator');


router.post('/login', loginValidator.makeLogin, loginController.makeLogin);
router.post('/register', loginValidator.register, loginController.register);
router.get('/check-login', loginController.checkLogin);

module.exports = router;