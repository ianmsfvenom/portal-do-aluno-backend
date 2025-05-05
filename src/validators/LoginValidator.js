const HttpError = require("../errors/HttpError");

module.exports = new class LoginValidator {
    makeLogin(req, res, next) {
        const { email, senha } = req.body;
        if (!email || !senha) return next(new HttpError(400, 'Email e senha obrigatórios'));
        next();
    }
};