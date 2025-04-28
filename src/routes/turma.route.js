const router = require('express').Router();
const turmaController = require('../controllers/TurmaController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const turmaValidator = require('../validators/TurmaValidator');


router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, turmaValidator.create, turmaController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, turmaValidator.delete, turmaController.delete);
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, turmaValidator.update, turmaController.update);
router.get('/admin/list', checkLoginMiddleware, checkAdminMiddleware, turmaController.list);

module.exports = router;