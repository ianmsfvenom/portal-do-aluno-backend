const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class TurmaController {
    async create(req, res) {
        const { nome, professor_id, curso_id, data_inicio, data_fim } = req.body;
        const turma = await prisma.turma.create({ data: { nome, professor_id, curso_id, data_inicio, data_fim } });
        return res.json(turma);
    }

    async delete(req, res) {
        const { id } = req.body;
        try {
            const turma = await prisma.turma.delete({ where: { id } });
            return res.json(turma);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar turma'));
        }
    }

    async update(req, res) {
        const { id, nome, professor_id, curso_id, data_inicio, data_fim } = req.body;
        const turma = await prisma.turma.update({ where: { id }, data: { nome, professor_id, curso_id, data_inicio, data_fim } });
        return res.json(turma);
    }

    async list(req, res) {
        const turmas = await prisma.turma.findMany({ include: { usuario: true, curso: true, alunos_turmas: true  } });
        return res.json(turmas);
    }
}