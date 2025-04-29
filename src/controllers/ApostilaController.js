const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports = new class ApostilaController {
    async create(req, res, next) {
        const { modulo_id, titulo, arquivo_url } = req.body;
        try {
            const newApostila = await prisma.apostila.create({ data: { modulo_id, titulo, arquivo_url } });
            return res.json(newApostila);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar apostila'));
        }
    }

    async listAdmin(req, res) {
        const listApostilas = await prisma.apostila.findMany({ include: { modulo: true } });
        return res.json(listApostilas);
    }

    async delete(req, res) {
        const { id } = req.body;
        try {
            const deleteApostila = await prisma.apostila.delete({ where: { id } });
            return res.json(deleteApostila);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar apostila'));
        }
    }

    async update(req, res) {    
        const { id, modulo_id, titulo, arquivo_url } = req.body;
        try {
            const updateApostila = await prisma.apostila.update({ where: { id }, data: { modulo_id, titulo, arquivo_url } });
            return res.json(updateApostila);
        } catch (error) {
            next(new HttpError(500, 'Erro ao atualizar apostila'));
        }
    }
}