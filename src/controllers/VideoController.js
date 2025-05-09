const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');

module.exports =  new class VideoController {
    async create(req, res, next) {
        try {
            const { modulo_id, titulo, url_video, duracao } = req.body;
            const newVideo = await prisma.video.create({ data: { modulo_id, titulo, url_video, duracao } });
            return res.json(newVideo);
        } catch (error) {
            next(new HttpError(500, 'Erro ao criar video'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const deleteVideo = await prisma.video.delete({ where: { id } });
            return res.json(deleteVideo);
        } catch (error) {
            next(new HttpError(500, 'Erro ao deletar video'));
        }
    }

    async list(req, res) {
        const videos = await prisma.video.findMany({ include: { modulo: true } });
        return res.json(videos);
    }
}