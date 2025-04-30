const HttpError = require('../errors/HttpError');
const prisma = require('../config/prisma');
const jwt = require('jsonwebtoken')

module.exports = new class AlunoController {
    async getCurso(req, res, next) {
        const Authorization = req.headers.authorization;
        const secretKey = readFileSync('./private.key', 'utf-8');
        const decodedToken = jwt.decode(Authorization, secretKey);
        const aluno = await prisma.usuario.findFirst({ 
            where: { id: decodedToken.id }, 
            include: { turmas: { include: { curso: true } } } 
        });
        if (!aluno) return next(new HttpError(404, 'Aluno nao encontrado'));
        return res.json(aluno.turmas)
    }

    async getTurma(req, res, next) {
        const Authorization = req.headers.authorization;
        const secretKey = readFileSync('./private.key', 'utf-8');
        const decodedToken = jwt.decode(Authorization, secretKey);
        const aluno = await prisma.usuario.findFirst({ 
            where: { id: decodedToken.id }, 
            include: { turmas: true }
        });
        if (!aluno) return next(new HttpError(404, 'Aluno nao encontrado'));
        return res.json(aluno.turmas)
    }

    async getModulos(req, res, next) {
        const { curso_id } = req.params;
        const Authorization = req.headers.authorization;
        const secretKey = readFileSync('./private.key', 'utf-8');
        const decodedToken = jwt.decode(Authorization, secretKey);
        const aluno = await prisma.usuario.findFirst({ 
            where: { id: decodedToken.id }, 
            include: { turmas: { include: { curso: { include: { modulos: true} } } } }
        });
        if (!aluno) return next(new HttpError(404, 'Aluno nao encontrado'));
        const modulos = aluno.turmas.filter(turma => turma.curso.id == curso_id)[0].curso.modulos;
        return res.json(modulos);
    }
}