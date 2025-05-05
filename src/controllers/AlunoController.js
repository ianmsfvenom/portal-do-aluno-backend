const path = require('path');
const prisma = require('../config/prisma');
const { encryptPassword } = require('../utils/password-utils')

module.exports = new class AlunoController {
    register = async (req, res) => {
        res.sendFile(path.resolve('./public/html/inscricao-aluno.html'));
    }

    payment = async (req, res) => {
        res.sendFile(path.resolve('./public/html/pagamento.html'));
    }

    
    async create(req, next, res) {
        const { nome, email, senha, plano_id } = req.body;

        const encryptedPassword = await encryptPassword(senha);
        
        const newUser = await prisma.usuario.create({ data: { nome, email, senha: encryptedPassword, tipo: 'aluno', plano_id } });
        return res.json(newUser);
    }
}