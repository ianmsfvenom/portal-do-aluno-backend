const router = require('express').Router();
const progressoAlunoController = require('../controllers/ProgressoAlunoController');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const progressoAlunoValidator = require('../validators/ProgressoAlunoValidator');

router.post('/create', checkLoginMiddleware, checkAlunoMiddleware, progressoAlunoValidator.create, progressoAlunoController.create);
router.post('/delete', checkLoginMiddleware, checkAlunoMiddleware, progressoAlunoValidator.delete, progressoAlunoController.delete);
router.post('/update', checkLoginMiddleware, checkAlunoMiddleware, progressoAlunoValidator.update, progressoAlunoController.update);
router.post('/update/video', checkLoginMiddleware, checkAlunoMiddleware, progressoAlunoValidator.updateByVideoId, progressoAlunoController.updateByVideoId);
router.get('/list', checkLoginMiddleware, checkAlunoMiddleware, progressoAlunoController.list);

module.exports = router;