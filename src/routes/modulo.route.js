const router = require('express').Router();
const moduloController = require('../controllers/ModuloController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const moduloValidator = require('../validators/ModuloValidator');

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, moduloValidator.create, moduloController.create);
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, moduloValidator.delete, moduloController.delete);
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, moduloValidator.update, moduloController.update);

router.get('/search', checkLoginMiddleware, moduloValidator.search, moduloController.search);


module.exports = router;