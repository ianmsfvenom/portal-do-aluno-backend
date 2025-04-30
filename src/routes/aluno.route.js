const router = require('express').Router();
const alunoController = require('../controllers/AlunoController');
const checkAlunoMiddleware = require('../middlewares/check-aluno-middleware');
const checkLoginMiddleware = require('../middlewares/check-login-middleware');
const alunoValidator = require('../validators/AlunoValidator');



module.exports = router;