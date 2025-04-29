const HttpError = require('../errors/HttpError')

module.exports = new class AvaliacaoValidator {
    async create(req, res, next) {
        const { modulo_id, titulo, descricao } = req.body
        if(!modulo_id || !titulo || !descricao) return next(new HttpError(400, 'modulo_id, titulo, descricao devem ser obrigatórios'));
        if(isNaN(modulo_id)) return next(new HttpError(400, 'modulo_id deve ser número'));
        next()
    }

    async update(req, res, next) {
        const { id, modulo_id } = req.body
        if(!id) return next(new HttpError(400, 'Id é obrigatório'));
        if(modulo_id && isNaN(modulo_id)) return next(new HttpError(400, 'modulo_id deve ser número'));
        next()
    }

    async delete(req, res, next) {
        const { id } = req.body
        if(!id) return next(new HttpError(400, 'Id é obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um número'))
        next()
    }
}