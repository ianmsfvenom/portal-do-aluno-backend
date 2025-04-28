const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class PlanoController {

    async create(req, res, next) {
        try {
            const { nome, descricao } = req.body;
            const plano = await prisma.plano.create({ data: { nome, descricao } });
            return res.json(plano);
        } catch (error) {
            next(new HttpError(500, 'Erro ao cadastrar plano'));
        }
    }

    async delete(req, res) {
        const { id } = req.body;
        try {
            const plano = await prisma.plano.delete({ where: { id } });
            return res.json(plano);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar plano'));
        }
    }

    async list(req, res) {
        const planos = await prisma.plano.findMany();
        return res.json(planos);
    }

    async listAdmin(req, res) {
        const planos = await prisma.plano.findMany({ include: { usuarios: true } });
        return res.json(planos);
    }
}