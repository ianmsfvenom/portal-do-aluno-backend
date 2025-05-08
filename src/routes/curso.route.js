const router = require('express').Router();
const cursoController = require('../controllers/CursoController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const cursoValidator = require('../validators/CursoValidator');

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, cursoValidator.create, cursoController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, cursoValidator.delete, cursoController.delete);
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, cursoValidator.update, cursoController.update);
router.get('/list', checkLoginMiddleware, checkAlunoMiddleware, cursoController.list);

module.exports = router;