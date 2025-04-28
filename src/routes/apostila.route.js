const router = require('express').Router();
const apostilaController = require('../controllers/ApostilaController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const apostilaValidator = require('../validators/ApostilaValidator');

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, apostilaValidator.create, apostilaController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, apostilaValidator.delete, apostilaController.delete);
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, apostilaValidator.update, apostilaController.update);
router.get('/admin/list', checkLoginMiddleware, checkAdminMiddleware, apostilaController.listAdmin);

module.exports = router;