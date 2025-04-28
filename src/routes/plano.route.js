const router = require('express').Router();
const planoController = require('../controllers/PlanoController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const planoValidator = require('../validators/PlanoValidator');

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, planoValidator.create, planoController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, planoValidator.delete, planoController.delete);
router.get('/admin/list', checkLoginMiddleware, checkAdminMiddleware, planoController.listAdmin);
router.get('/list', checkLoginMiddleware, planoController.list);

module.exports = router;