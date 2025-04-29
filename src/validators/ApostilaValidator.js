const HttpError = require('../errors/HttpError');

module.exports = new class ApostilaValidator {
    async create(req, res, next) {
        const { modulo_id, titulo, arquivo_url } = req.body;
        if (!modulo_id || !titulo || !arquivo_url) return next(new HttpError(400, 'Modulo, titulo e arquivo obrigatórios'));
        next();
    }
    async delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        next();
    }
    async update(req, res, next) {
        const { id, modulo_id, titulo, arquivo_url } = req.body;
        if (!id || !modulo_id || !titulo || !arquivo_url) return next(new HttpError(400, 'Id, modulo, titulo e arquivo obrigatórios'));
        if(isNaN(id) || isNaN(modulo_id)) return next(new HttpError(400, 'Id e modulo deve ser um numero'));
        next();
    }
}