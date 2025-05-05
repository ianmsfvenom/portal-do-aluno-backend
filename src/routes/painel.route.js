const router = require('express').Router();
const painelController = require('../controllers/PainelController');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');

router.get('/', checkLoginMiddleware, painelController.index);
router.get('/cursos', checkLoginMiddleware, painelController.cursos);


module.exports = router;