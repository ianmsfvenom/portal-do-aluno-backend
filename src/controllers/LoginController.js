const prisma = require('../config/prisma');
const HttpError = require('../errors/HttpError');
const { comparePassword, encryptPassword } = require('../utils/password-utils');

module.exports = new class LoginController {
    async makeLogin(req, res, next) {
        const { email, senha } = req.body;
        const findUser = await prisma.usuario.findFirst({
            where: { email }
        });
        if (!findUser) return next(new HttpError(403, 'Usuário ou senha incorretos'));
        
        const isValidPassword = await comparePassword(senha, findUser.senha);
        if (!isValidPassword) return next(new HttpError(403, 'Usuário ou senha incorretos'));

        const secretKey = readFileSync('./private.key', 'utf-8');
        const token = jsonwebtoken.sign({ id: findUser.id }, secretKey, { expiresIn: '2h' });
        res.cookie('Authorization', `Bearer ${token}`);

        return res.json({ message: 'Logado com sucesso' });
    }

    checkLogin(req, res, next) {
        const authorization = req.cookies.Authorization;

        if (!authorization) return res.json({ isLogged: false });

        const token = authorization.split(' ')[1];
        const secretKey = readFileSync('./private.key', 'utf-8');

        try {
            jsonwebtoken.verify(token, secretKey);
        } catch (error) {
            return res.json({ isLogged: false });
        }

        return res.json({ isLogged: true });
    }
    
    async register(req, next, res) {
        const { nome, email, senha, tipo, plano_id, security_key } = req.body;

        if(security_key !== process.env.SECURITY_KEY) return next(new HttpError(400, 'Chave de segurança inválida'));

        const encryptedPassword = await encryptPassword(senha);
        
        const newUser = await prisma.usuario.create({ data: { nome, email, senha: encryptedPassword, tipo, plano_id } });
        return res.json(newUser);
    }
}