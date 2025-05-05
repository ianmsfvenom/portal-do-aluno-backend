const { readFileSync } = require('fs');
const prisma = require('../config/prisma');
const HttpError = require('../errors/HttpError');
const { comparePassword, encryptPassword } = require('../utils/password-utils');
const jwt = require('jsonwebtoken');
const path = require('path')

module.exports = new class LoginController {

    async index(req, res) {
        const Authorization = req.cookies.Authorization;
        const loginPath = path.resolve('./public/html/login.html');
        if (!Authorization) return res.sendFile(loginPath);
        const secretKey = readFileSync('./private.key', 'utf-8');
        try {
            jwt.verify(Authorization, secretKey);
            return res.redirect('/painel');
        } catch (error) {
            res.clearCookie('Authorization');
            return res.sendFile(loginPath);
        }
    }

    async makeLogin(req, res, next) {
        const { email, senha } = req.body;
        const findUser = await prisma.usuario.findFirst({
            where: { email }
        });
        if (!findUser) return next(new HttpError(403, 'Usuário ou senha incorretos'));
        
        const isSamePassword = await comparePassword(senha, findUser.senha);
        if (!isSamePassword) return next(new HttpError(403, 'Usuário ou senha incorretos'));

        const secretKey = readFileSync('./private.key', 'utf-8');
        const token = jwt.sign({ id: findUser.id }, secretKey, { expiresIn: '2h' });
        res.cookie('Authorization', `Bearer ${token}`);
        
        return res.json({ success: true });
    }

    checkLogin(req, res, next) {
        const authorization = req.cookies.Authorization;

        if (!authorization) return res.json({ isLogged: false });

        const token = authorization.split(' ')[1];
        const secretKey = readFileSync('./private.key', 'utf-8');

        try {
            jwt.verify(token, secretKey);
        } catch (error) {
            res.clearCookie('Authorization');
            return res.json({ isLogged: false });
        }

        return res.json({ isLogged: true });
    }
}