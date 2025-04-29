const router = require('express').Router();
const parceriaController = require('../controllers/ParceriaController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const parceriaValidator = require('../validators/ParceriaValidator');

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, parceriaValidator.create, parceriaController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, parceriaValidator.delete, parceriaController.delete);
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, parceriaValidator.update, parceriaController.update);
router.get('/admin/list', checkLoginMiddleware, checkAdminMiddleware, parceriaController.list);

module.exports = router;