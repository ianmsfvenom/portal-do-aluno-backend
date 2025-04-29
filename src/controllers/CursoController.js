const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class CursoController {
    async create(req, res, next) {
        const { modulo_id, titulo, descricao } = req.body;
        try {
            const newCurso = await prisma.curso.create({ data: { modulo_id, titulo, descricao } });
            return res.json(newCurso);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar curso'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.body;
        try {
            const deleteCurso = await prisma.curso.delete({ where: { id } });
            return res.json(deleteCurso);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar curso'));
        }
    }
    async update(req, res, next) {
        const { id, modulo_id, titulo, descricao } = req.body;
        try {
            const updateCurso = await prisma.curso.update({ where: { id }, data: { modulo_id, titulo, descricao } });
            return res.json(updateCurso);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar curso'));
        }
    }
    async list(req, res, next) {
        try {
            const cursos = await prisma.curso.findMany({ include: { modulo: true } });
            return res.json(cursos);
        } catch (error) {
            next(new HttpError(500, 'Erro ao listar curso'));
        }
    }
}