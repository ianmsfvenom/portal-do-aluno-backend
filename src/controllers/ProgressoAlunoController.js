const prisma = require('../config/prisma');
const HttpError = require('../errors/HttpError');

module.exports = new class ProgressoAlunoController {
    async create(req, res, next) {
        const { aluno_id, video_id, apostila_id, avaliacao_id, 
            progresso_video, baixou_apostila, nota_avaliacao, 
            data_ultima_interacao } = req.body;
        try {
            const [dia, mes, ano] = data_ultima_interacao.split('/');
            const date = new Date(ano, mes - 1, dia);

            const progresso_aluno = await prisma.progressoAluno.create({ data: { 
                aluno_id, video_id, apostila_id, avaliacao_id, 
                progresso_video, baixou_apostila, nota_avaliacao, 
                data_ultima_interacao: date 
            }});

            return res.json(progresso_aluno);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar progresso do aluno'))
        }
    }
    async delete(req, res, next) {
        const { id } = req.body;
        try {
            const deleteProgressoAluno = await prisma.progressoAluno.delete({ where: { id } });
            return res.json(deleteProgressoAluno);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar progresso do aluno'));
        }
    }
    async update(req, res, next) {
        const { id, aluno_id, video_id, apostila_id, avaliacao_id, 
            progresso_video, baixou_apostila, nota_avaliacao, 
            data_ultima_interacao } = req.body;
        try {
            const [dia, mes, ano] = data_ultima_interacao.split('/');
            const date = new Date(ano, mes - 1, dia);

            const updateProgressoAluno = await prisma.progressoAluno.update({ where: { id }, data: { 
                aluno_id, video_id, apostila_id, avaliacao_id, 
                progresso_video, baixou_apostila, nota_avaliacao, 
                data_ultima_interacao: date 
            }});

            return res.json(updateProgressoAluno);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar progresso do aluno'));
        }
    }
    async list(req, res, next) {
        try {
            const progresso_alunos = await prisma.progressoAluno.findMany({ include: 
                { apostila: true, avaliacoe: true, video: true, usuario: true } 
            });
            return res.json(progresso_alunos);
        } catch (error) {
            next(new HttpError(500, 'Erro ao listar progresso do aluno'));
        }
    }
}