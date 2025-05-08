const prisma = require('../config/prisma');
const { encryptPassword } = require('../utils/password-utils');

(async () => {
    await prisma.plano.createMany({
        data: [
            { nome: 'Básico', descricao: 'Plano básico' },
            { nome: 'Empreendedor', descricao: 'Plano empreendedor' },
            { nome: 'Startup', descricao: 'Plano startup' },
        ]
    })
    await prisma.usuario.createMany({
        data: [
            { nome: 'Ian Pablo', email: 'ian@aluno.com', senha: await encryptPassword('123456'), tipo: 'aluno', plano_id: 1 },
            { nome: 'Joao Paulo', email: 'jao@professor.com', senha: await encryptPassword('123456'), tipo: 'professor' },
            { nome: 'Maria Eduarda', email: 'maria@admin.com', senha: await encryptPassword('123456'), tipo: 'admin' },
        ]
    })
    await prisma.curso.createMany({
        data: [
            { titulo: 'Introdução ao HTML', descricao: 'Introdução ao HTML', categoria: 'HTML', carga_horaria: 80 },
            { titulo: 'Introdução ao CSS', descricao: 'Introdução ao CSS', categoria: 'CSS', carga_horaria: 120 },
            { titulo: 'Introdução ao JavaScript', descricao: 'Introdução ao JavaScript', categoria: 'JavaScript', carga_horaria: 160 },
        ]
    })
    await prisma.turma.createMany({
        data: [
            { nome: 'Turma 1', curso_id: 1, data_inicio: new Date(), data_fim: new Date() },
            { nome: 'Turma 2', curso_id: 2, data_inicio: new Date(), data_fim: new Date() },
            { nome: 'Turma 3', curso_id: 3, data_inicio: new Date(), data_fim: new Date() },
        ]
    })
    await prisma.alunoTurma.createMany({
        data: [
            { aluno_id: 1, turma_id: 1 },
            { aluno_id: 1, turma_id: 2 },
            { aluno_id: 1, turma_id: 3 },
        ]
    })
    await prisma.parceria.createMany({
        data: [
            { aluno_id: 1, data_assinatura: new Date(), percentual_plataforma: 50, contrato_url: 'https://www.google.com.br', descricao_projeto: 'Projeto 1' },
            { aluno_id: 1, data_assinatura: new Date(), percentual_plataforma: 50, contrato_url: 'https://www.google.com.br', descricao_projeto: 'Projeto 2' },
            { aluno_id: 1, data_assinatura: new Date(), percentual_plataforma: 50, contrato_url: 'https://www.google.com.br', descricao_projeto: 'Projeto 3' },
        ]
    })

})()