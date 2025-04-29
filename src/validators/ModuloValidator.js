const HttpError = require('../errors/HttpError')

module.exports = new class ModuloValidator {
    async create(req, res, next) {
        const { curso_id, titulo, ordem } = req.body;
        if (!curso_id || !titulo || !ordem) return next(new HttpError(400, 'Curso, titulo e ordem obrigatórios'));
        if(isNaN(curso_id) || isNaN(ordem)) return next(new HttpError(400, 'Curso deve ser um número'));
        next();
    }

    async delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um número'));
        next();
    }

    async update(req, res, next) {
        const { id, curso_id, titulo, ordem } = req.body;
        if (!id || !curso_id || !titulo || !ordem) return next(new HttpError(400, 'Id, curso, titulo e ordem obrigatórios'));
        if(isNaN(id) || isNaN(curso_id) || isNaN(ordem)) return next(new HttpError(400, 'Id, curso e ordem devem ser números'));
        next();
    }
}