const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class ModuloController {
    async create(req, res, next) {
        const { curso_id, titulo, ordem } = req.body;
        try {
            const modulo = await prisma.modulo.create({ data: { curso_id, titulo, ordem } });
            return res.json(modulo);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar modulo'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.body;
        try {
            const modulo = await prisma.modulo.delete({ where: { id } });
            return res.json(modulo);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar modulo'));
        }
    }

    async update (req, res, next) {
        const { id, curso_id, titulo, ordem } = req.body;
        try {
            const modulo = await prisma.modulo.update({ where: { id }, data: { curso_id, titulo, ordem } });
            return res.json(modulo);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar modulo'));
        }
    }

    async list(req, res, next) {
        try {
            const modulos = await prisma.modulo.findMany({ include: { curso: true } });
            return res.json(modulos);
        } catch (error) {
            next(new HttpError(500, 'Erro ao listar modulo'));
        }
    }
}