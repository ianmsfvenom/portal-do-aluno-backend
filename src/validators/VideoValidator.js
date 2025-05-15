const HttpError = require("../errors/HttpError");

module.exports = new class VideoValidator {
    
    async create(req, res, next) {
        const { modulo_id, titulo, url_video, duracao } = req.body;
        if (!modulo_id || !titulo || !url_video || !duracao) return next(new HttpError(400, 'Modulo, titulo, url e duracao obrigatórios'));
        if(isNaN(duracao) || isNaN(modulo_id)) return next(new HttpError(400, 'Duracao e modulo deve ser um numero'));
        next();
    }

    async delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um numero'));
        next();
    }   

    search(req, res, next) {
        const { modulo } = req.body;
        if (!modulo) return next(new HttpError(400, 'Modulo obrigatório'));
        if(isNaN(modulo)) return next(new HttpError(400, 'Modulo deve ser um número'));
        next();
    }
}