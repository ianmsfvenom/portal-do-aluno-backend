const jwt = require('jsonwebtoken');
const path = require('path');
const prisma = require('../config/prisma');

module.exports = new class PainelController {
    async index(req, res) {
        const Authorization = req.cookies.Authorization.split(' ')[1];
        const decodedToken = jwt.decode(Authorization);
        if(!decodedToken.id) return res.redirect('/login');
        
        const findUser = await prisma.usuario.findFirst({ where: { id: decodedToken.id }, include: { plano: true } });
        if(!findUser) return res.redirect('/login');
        
        if(findUser.tipo === 'aluno') {
            if(findUser.plano.nome === 'Básico')
                return res.sendFile(path.resolve('./public/html/painel-aluno-basico.html'));
            if(findUser.plano.nome === 'Empreendedor')
                return res.sendFile(path.resolve('./public/html/painel-aluno-emp.html'));
            if(findUser.plano.nome === 'Startup')
                return res.sendFile(path.resolve('./public/html/painel-aluno-startup.html'));
        }
        if(findUser.tipo === 'professor') return res.sendFile(path.resolve('./public/html/painel-professor.html'));
        if(findUser.tipo === 'admin') return res.sendFile(path.resolve('./public/html/painel-admin.html'));
    }

    async cursos(req, res) {
        
    }
}