const router = require('express').Router();
const alunoController = require('../controllers/AlunoController');
const alunoValidator = require('../validators/AlunoValidator');

router.post('/create', alunoValidator.create, alunoController.create)
router.get('/inscricao', alunoController.register)
router.get('/inscricao/pagamento', alunoController.payment)

module.exports = router;