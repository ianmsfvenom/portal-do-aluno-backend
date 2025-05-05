const prisma = require("../config/prisma");
const HttpError = require("../errors/HttpError");

module.exports = new class AlunoValidator {
    async create(req, res, next) {
        const { nome, email, senha, plano_id } = req.body;

        if(!nome || !email || !senha) return next(new HttpError(400, 'Nome, email, senha são obrigatórios'));
        
        const findUser = await prisma.usuario.findFirst({ where: { email } });
        if(findUser) return next(new HttpError(403, 'Usuário ja cadastrado'));

        if(plano_id) {
            if(typeof plano_id !== 'number') return next(new HttpError(400, 'Plano inválido'));
            const findPlano = await prisma.plano.findFirst({ where: { id: plano_id } });
            if(!findPlano) return next(new HttpError(400, 'Plano inválido'));
        }

        next();
    }
}