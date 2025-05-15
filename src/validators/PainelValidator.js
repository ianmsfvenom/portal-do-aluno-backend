const HttpError = require("../errors/HttpError");

module.exports = new class PainelValidator {
    aula (req, res, next) {
        const { curso } = req.query;	
        if (!curso) return res.redirect('/painel/cursos');
        if(isNaN(curso)) return res.redirect('/painel/cursos');

        next();
    }
}
