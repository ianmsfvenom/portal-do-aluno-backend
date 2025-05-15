const router = require('express').Router();
const painelController = require('../controllers/PainelController');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');
const painelValidator = require('../validators/PainelValidator');

router.get('/', checkLoginMiddleware, painelController.index);
router.get('/cursos', checkLoginMiddleware, checkAlunoMiddleware, painelController.cursos);
router.get('/aula', checkLoginMiddleware, checkAlunoMiddleware, painelValidator.aula, painelController.aula);

module.exports = router;