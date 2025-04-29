const prisma = require('../config/prisma');
const HttpError = require('../errors/HttpError');

module.exports = new class ParceriaController {
    async create(req, res, next) {
        const { aluno_id, descricao_projeto, percentual_plataforma, data_assinatura, contrato_url } = req.body;
        try {
            const [ dia, mes, ano ] = data_assinatura.split('/');
            const date = new Date(ano, mes - 1, dia);
            const newParceria = await prisma.parceria.create({ data: { 
                aluno_id,
                descricao_projeto,
                percentual_plataforma,
                data_assinatura: date,
                contrato_url
            }});

            return res.json(newParceria);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar parceria'));
        }
    }

    async list(req, res, next) {
        try {
            const parcerias = await prisma.parceria.findMany({ include: { aluno: true } });
            return res.json(parcerias);
        } catch (error) {
            next(new HttpError(500, 'Erro ao listar parceria'));
        }
    }

    async update(req, res, next) {
        const { id, aluno_id, descricao_projeto, percentual_plataforma, data_assinatura, contrato_url } = req.body;
        try {
            const [ dia, mes, ano ] = data_assinatura.split('/');
            const date = new Date(ano, mes - 1, dia);
            const updateParceria = await prisma.parceria.update({ where: { id }, data: 
                { aluno_id, descricao_projeto, percentual_plataforma, data_assinatura: date, contrato_url } 
            });
            return res.json(updateParceria);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar parceria'));
        }
    }

    async delete(req, res, next) {
        const { id } = req.body;
        try {
            const deleteParceria = await prisma.parceria.delete({ where: { id } });
            return res.json(deleteParceria);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar parceria'));
        }
    }
}