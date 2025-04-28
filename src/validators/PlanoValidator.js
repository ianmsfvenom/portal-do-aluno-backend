const HttpError = require('../errors/HttpError');

module.exports = new class PlanoValidator {
    create(req, res, next) {
        const { nome, descricao } = req.body;
        if (!nome || !descricao) return next(new HttpError(400, 'Nome e descricao obrigatórios'));
        next();
    }

    delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        next();
    }
}
