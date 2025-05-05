const jsonwebtoken = require('jsonwebtoken');
const { readFileSync } = require('fs');

const checkLoginMiddleware = (req, res, next) => {
    const authorization = req.cookies.Authorization;
    if (!authorization) return res.redirect('/login'); 

    const token = authorization.split(' ')[1];
    const secretKey = readFileSync('./private.key', 'utf-8');

    try {
        jsonwebtoken.verify(token, secretKey);
    } catch (error) {
        res.clearCookie('Authorization');
        return res.redirect('/login'); 
    }

    next();
}

module.exports = checkLoginMiddleware;