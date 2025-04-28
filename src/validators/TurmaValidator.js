const HttpError = require('../errors/HttpError');

module.exports = new class TurmaValidator {
    create(req, res, next) {
        const { nome, professor_id, curso_id, data_inicio, data_fim } = req.body;
        if (!nome || !professor_id || !curso_id || !data_inicio || !data_fim) return next(new HttpError(400, 'Nome, professor_id, curso_id, data_inicio e data_fim obrigatórios'));
        if(isNaN(professor_id) || isNaN(curso_id)) return next(new HttpError(400, 'professor_id e curso_id deve ser um numero'));

        const [dia, mes, ano] = data_inicio.split('/');
        const date = new Date(ano, mes - 1, dia);
        if (isNaN(date.getTime())) return next(new HttpError(400, 'Data de inicio inválida'));

        const [dia2, mes2, ano2] = data_fim.split('/');
        const date2 = new Date(ano2, mes2 - 1, dia2);
        if (isNaN(date2.getTime())) return next(new HttpError(400, 'Data de fim inválida'));

        if(date.getTime() > date2.getTime()) return next(new HttpError(400, 'Data de fim deve ser maior que a data de inicio'));

        next();
    }

    delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um numero'));
        next();
    }

    update(req, res, next) {
        const { id, nome, professor_id, curso_id, data_inicio, data_fim } = req.body;

        if(!id) return next(new HttpError(400, 'Id obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um numero'));

        if(data_inicio) {
            const [dia, mes, ano] = data_inicio.split('/');
            const date = new Date(ano, mes - 1, dia);
            if (isNaN(date.getTime())) return next(new HttpError(400, 'Data de inicio inválida'));
        }

        if(data_fim) {    
            const [dia2, mes2, ano2] = data_fim.split('/');
            const date2 = new Date(ano2, mes2 - 1, dia2);
            if (isNaN(date2.getTime())) return next(new HttpError(400, 'Data de fim inválida'));
        }

        if(professor_id && isNaN(professor_id)) return next(new HttpError(400, 'professor_id deve ser um numero'));
        if(curso_id && isNaN(curso_id)) return next(new HttpError(400, 'curso_id deve ser um numero'));

        next();
    }
}