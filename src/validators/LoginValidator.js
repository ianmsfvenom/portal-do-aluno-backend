const prisma = require("../config/prisma");
const HttpError = require("../errors/HttpError");

module.exports = new class LoginValidator {
    makeLogin(req, res, next) {
        const { email, senha } = req.body;
        if (!email || !senha) return next(new HttpError(400, 'Email e senha obrigatórios'));
        next();
    }

    async register(req, res, next) {
        const { nome, email, senha, tipo, plano_id, security_key } = req.body;

        if(!security_key) return next(new HttpError(400, 'Chave de segurança é obrigatória'));
        if(!nome || !email || !senha || !tipo) return next(new HttpError(400, 'Nome, email, senha e tipo são obrigatórios'));
        if(tipo !== 'professor' && tipo !== 'aluno' && tipo !== 'admin') return next(new HttpError(400, 'Tipo inválido'));
        
        if(plano_id) {
            const findPlano = await prisma.plano.findFirst({ where: { id: plano_id } });
            if(!findPlano) return next(new HttpError(400, 'Plano inválido'));
        }

        next();
    }
};