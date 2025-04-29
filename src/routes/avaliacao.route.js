const router = require('express').Router()
const avaliacaoController = require('../controllers/AvaliacaoController')
const avaliacaoValidator = require('../validators/AvaliacaoValidator')
const checkLoginMiddleware = require('../middlewares/check-login-middleware')
const checkAdminMiddleware = require('../middlewares/check-admin-middleware')

router.post('/admin/create', checkLoginMiddleware, checkAdminMiddleware, avaliacaoValidator.create, avaliacaoController.create)
router.post('/admin/delete', checkLoginMiddleware, checkAdminMiddleware, avaliacaoValidator.delete, avaliacaoController.delete)
router.post('/admin/update', checkLoginMiddleware, checkAdminMiddleware, avaliacaoValidator.update, avaliacaoController.update)
router.get('/admin/list', checkLoginMiddleware, checkAdminMiddleware, avaliacaoController.list)

module.exports = router