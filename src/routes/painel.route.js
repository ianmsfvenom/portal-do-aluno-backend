const router = require('express').Router();
const painelController = require('../controllers/PainelController');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');

router.get('/', checkLoginMiddleware, painelController.index);
router.get('/cursos', checkLoginMiddleware, checkAlunoMiddleware, painelController.cursos);


module.exports = router;