const HttpError = require('../errors/HttpError');

module.exports = new class ProgressoAlunoValidator {
    create(req, res, next) {
        const { aluno_id, video_id, apostila_id, avaliacao_id, 
            progresso_video, baixou_apostila, nota_avaliacao, 
            data_ultima_interacao } = req.body;

        if (!aluno_id || !video_id || !apostila_id || !avaliacao_id || 
            !progresso_video || !baixou_apostila || !nota_avaliacao || 
            !data_ultima_interacao) return next(new HttpError(400, 'Todos os campos obrigatórios'));

        if(isNaN(aluno_id) || isNaN(video_id) || isNaN(apostila_id) || 
            isNaN(avaliacao_id) || isNaN(progresso_video) || 
            isNaN(nota_avaliacao)) return next(new HttpError(400, 'Todos os campos devem ser numéricos'));

        const [ dia, mes, ano ] = data_ultima_interacao.split('/');
        if(!dia || !mes || !ano) return next(new HttpError(400, 'Data de assinatura obrigatória'));
        const date = new Date(ano, mes - 1, dia);
        if (isNaN(date.getTime())) return next(new HttpError(400, 'Data de assinatura inválida'));

        next();
    }
    delete(req, res, next) {
        const { id } = req.body;
        if (!id) return next(new HttpError(400, 'Id obrigatório'));
        if(isNaN(id)) return next(new HttpError(400, 'Id deve ser um número'));
        next();
    }
    update(req, res, next) {
        const { id, aluno_id, video_id, apostila_id, avaliacao_id, 
            progresso_video, baixou_apostila, nota_avaliacao, 
            data_ultima_interacao } = req.body;

        if(!id) return next(new HttpError(400, 'Id é obrigatório'));
        if(id && isNaN(id)) return next(new HttpError(400, 'Id deve ser um número'));
        if(aluno_id && isNaN(aluno_id)) return next(new HttpError(400, 'Aluno deve ser um número'));
        if(video_id && isNaN(video_id)) return next(new HttpError(400, 'Video deve ser um número'));
        if(apostila_id && isNaN(apostila_id)) return next(new HttpError(400, 'Apostila deve ser um número'));
        if(avaliacao_id && isNaN(avaliacao_id)) return next(new HttpError(400, 'Avaliação deve ser um número'));
        if(progresso_video && isNaN(progresso_video)) return next(new HttpError(400, 'Progresso do video deve ser um número'));
        if(nota_avaliacao && isNaN(nota_avaliacao)) return next(new HttpError(400, 'Nota da avaliação deve ser um número'));
        if(data_ultima_interacao) {
            const [dia, mes, ano] = data_ultima_interacao.split('/');
            if(!dia || !mes || !ano) return next(new HttpError(400, 'Data de assinatura obrigatória'));
            const date = new Date(ano, mes - 1, dia);
            if(isNaN(date.getTime())) return next(new HttpError(400, 'Data de assinatura inválida'));
        }
        next();
    }
    updateByVideoId(req, res, next) {
        const { video_id, progresso_video } = req.body;
        if(!video_id) return next(new HttpError(400, 'Video obrigatório'));
        if(video_id && isNaN(video_id)) return next(new HttpError(400, 'Video deve ser um número'));
        if(progresso_video && isNaN(progresso_video)) return next(new HttpError(400, 'Progresso do video deve ser um número'));
        next();
    }
}