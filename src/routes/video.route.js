const router = require('express').Router();
const videoController = require('../controllers/VideoController');
const checkAdminMiddleware = require('../middlewares/check-admin-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const videoValidator = require('../validators/VideoValidator');

router.post('/admin/create', checkAdminMiddleware, checkLoginMiddleware, videoValidator.create, videoController.create);
router.post('/admin/delete', checkAdminMiddleware, checkLoginMiddleware, videoValidator.delete, videoController.delete);
router.get('/search', checkLoginMiddleware, videoValidator.search, videoController.search);

module.exports = router;