const jsonwebtoken = require('jsonwebtoken');
const { readFileSync } = require('fs');

const checkLoginMiddleware = (req, res, next) => {
    const authorization = req.cookies.Authorization;
    if (!authorization) return res.status(401).json({ message: 'Não autorizado' });

    const token = authorization.split(' ')[1];
    const secretKey = readFileSync('./private.key', 'utf-8');

    try {
        jsonwebtoken.verify(token, secretKey);
    } catch (error) {
        return res.status(401).json({ message: 'Não autorizado' });
    }

    next();
}

module.exports = checkLoginMiddleware;