const HttpError = require('../errors/HttpError');

module.exports = new class ParceriaController {
    async create(req, res, next) {
        const { aluno_id, descricao_projeto, percentual_plataforma, data_assinatura, contrato_url } = req.body;
        if(!aluno_id || !descricao_projeto || !percentual_plataforma || !data_assinatura || !contrato_url) 
            return next(new HttpError(400, 'Aluno, descricao, percentual, data e contrato obrigatórios'));

        if(isNaN(aluno_id)) return next(new HttpError(400, 'Aluno deve ser um número'));
        if(isNaN(percentual_plataforma)) return next(new HttpError(400, 'Percentual deve ser um número'));

        const [dia, mes, ano] = data_assinatura.split('/');
        if(!dia || !mes || !ano) return next(new HttpError(400, 'Data de assinatura obrigatória'));
        const date = new Date(ano, mes - 1, dia);
        if(isNaN(date.getTime())) return next(new HttpError(400, 'Data de assinatura inválida'));

        next();
    }

    async update(req, res, next) {
        const { id, aluno_id, percentual_plataforma, data_assinatura } = req.body;
        if(!id) return next(new HttpError(400, 'Id é obrigatório'));
        if(aluno_id && isNaN(aluno_id)) return next(new HttpError(400, 'Aluno deve ser um número'));
        if(percentual_plataforma && isNaN(percentual_plataforma)) return next(new HttpError(400, 'Percentual deve ser um número'));
        if(data_assinatura) {
            const [dia, mes, ano] = data_assinatura.split('/');
            if(!dia || !mes || !ano) return next(new HttpError(400, 'Data de assinatura obrigatória'));
            const date = new Date(ano, mes - 1, dia);
            if(isNaN(date.getTime())) return next(new HttpError(400, 'Data de assinatura inválida'));
        }
        next();
    }

    async delete(req, res, next) {
        const { id } = req.body;
        if(!id) return next(new HttpError(400, 'Id é obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um número'));
        next();
    }
}