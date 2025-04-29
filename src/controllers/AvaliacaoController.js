const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class AvaliacaoController {
    async create(req, res, next) {
        const { modulo_id, titulo, descricao } = req.body
        try {
            const newAvaliacao = await prisma.avaliacao.create({ data: { modulo_id, titulo, descricao } });
            return res.json(newAvaliacao);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar avaliação'));
        }
    }

    async update(req, res, next) {
        const { id, modulo_id, titulo, descricao } = req.body
        try {
            const updateAvaliacao = await prisma.avaliacao.update({ where: { id }, data: { modulo_id, titulo, descricao } });
            return res.json(updateAvaliacao);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar avaliação'));
        }
    }

    async list(req, res, next) {
        try {
            const avaliacoes = await prisma.avaliacao.findMany({ include: { modulo: true } });
            return res.json(avaliacoes);
        } catch (error) {
            next(new HttpError(500, 'Erro ao listar avaliação'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.body
        try {
            const deleteAvaliacao = await prisma.avaliacao.delete({ where: { id } });
            return res.json(deleteAvaliacao);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar avaliação'));
        }
    }
}