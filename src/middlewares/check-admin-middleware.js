const HttpError = require('../errors/HttpError');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');

const checkAdminMiddleware = async (req, res, next) => {
    const Authorization = req.cookies.Authorization.split(' ')[1];
    const secretKey = readFileSync('./private.key', 'utf-8');
    const token = jwt.verify(Authorization, secretKey);
    if(!token.id) {
        res.clearCookie('Authorization');
        return next(new HttpError(401, 'Não autorizado'));
    }
    const user = await prisma.usuario.findFirst({ where: { id: token.id } });
    if(!user) {
        res.clearCookie('Authorization');
        return next(new HttpError(401, 'Não autorizado'));
    }
    if(user.tipo !== 'admin') return next(new HttpError(401, 'Não autorizado'));
};

module.exports = checkAdminMiddleware;