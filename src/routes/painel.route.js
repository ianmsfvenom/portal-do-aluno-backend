const router = require('express').Router();
const painelController = require('../controllers/PainelController');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');
const painelValidator = require('../validators/PainelValidator');

router.get('/', checkLoginMiddleware, painelController.index);
router.get('/cursos', checkLoginMiddleware, painelController.cursos);
router.get('/aula', checkLoginMiddleware, painelValidator.aula, painelController.aula);
router.get('/lista-alunos', checkLoginMiddleware, painelController.listaAlunos);
router.get('/lista-professores', checkLoginMiddleware, painelController.listaProfessores);

module.exports = router;