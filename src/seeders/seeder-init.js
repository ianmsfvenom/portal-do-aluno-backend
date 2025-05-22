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

    await prisma.modulo.createMany({
        data: [
            { curso_id: 1, ordem: 1, titulo: 'Introdução ao HTML 1' },
            { curso_id: 1, ordem: 2, titulo: 'Introdução ao HTML 2' },
            { curso_id: 1, ordem: 3, titulo: 'Introdução ao HTML 3' },
            { curso_id: 2, ordem: 1, titulo: 'Introdução ao CSS 1' },
            { curso_id: 2, ordem: 2, titulo: 'Introdução ao CSS 2' },
            { curso_id: 2, ordem: 3, titulo: 'Introdução ao CSS 3' },
            { curso_id: 3, ordem: 1, titulo: 'Introdução ao JavaScript 1' },
            { curso_id: 3, ordem: 2, titulo: 'Introdução ao JavaScript 2' },
            { curso_id: 3, ordem: 3, titulo: 'Introdução ao JavaScript 3' },
        ]
    })

    await prisma.video.createMany({
        data: [
            { url_video: 'https://www.youtube.com/embed/sj0p9O85AIg?si=nIayuCKvR6D9Pzl6', duracao: 1199, modulo_id: 1, titulo: 'Aula 1' },
            { url_video: 'https://www.youtube.com/embed/MOd8PCyEB88?si=LoJMvpjhJbtFkMAd', duracao: 789, modulo_id: 1, titulo: 'Aula 2' },
            { url_video: 'https://www.youtube.com/embed/1ntb19o-2MI?si=nwBRkmYsHlEJ8nJv', duracao: 1358, modulo_id: 1, titulo: 'Aula 3' },
            { url_video: 'https://www.youtube.com/embed/RiGo7BN1Wps?si=Dsmx-i9VH6JqbH_m', duracao: 926, modulo_id: 2, titulo: 'Aula 4' },
            { url_video: 'https://www.youtube.com/embed/bzWtE7GFi0Y?si=xKb2A5t-fe3_phUC', duracao: 716, modulo_id: 2, titulo: 'Aula 5' },
            { url_video: 'https://www.youtube.com/embed/Sl0edqPVrGg?si=3mlPUveL_IOsFleX', duracao: 430, modulo_id: 2, titulo: 'Aula 6' },
            { url_video: 'https://www.youtube.com/embed/eb5tPfOeexI?si=1Z83UAOQRXf0I7co', duracao: 802, modulo_id: 3, titulo: 'Aula 7' },
            { url_video: 'https://www.youtube.com/embed/2FvW812Up1U?si=0DIVqRPMi8PwkWK3', duracao: 2610, modulo_id: 3, titulo: 'Aula 8' },
            { url_video: 'https://www.youtube.com/embed/tTUdJlcjEo4?si=juyVrXVaMaMmXNpQ', duracao: 454, modulo_id: 3, titulo: 'Aula 9' },
        ]
    })

    await prisma.apostila.createMany({
        data: [
            { modulo_id: 1, titulo: 'Apostila 1', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 1, titulo: 'Apostila 2', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 1, titulo: 'Apostila 3', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 2, titulo: 'Apostila 1', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 2, titulo: 'Apostila 2', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 2, titulo: 'Apostila 3', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 3, titulo: 'Apostila 1', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 3, titulo: 'Apostila 2', arquivo_url: 'https://www.google.com.br' },
            { modulo_id: 3, titulo: 'Apostila 3', arquivo_url: 'https://www.google.com.br' },
        ]
    })

    await prisma.avaliacao.createMany({
        data: [
            { modulo_id: 1, descricao: 'Primeira avaliação', titulo: 'Avaliação 1' },
            { modulo_id: 1, descricao: 'Segunda avaliação', titulo: 'Avaliação 2' },
            { modulo_id: 1, descricao: 'Terceira avaliação', titulo: 'Avaliação 3' },
            { modulo_id: 2, descricao: 'Primeira avaliação', titulo: 'Avaliação 1' },
            { modulo_id: 2, descricao: 'Segunda avaliação', titulo: 'Avaliação 2' },
            { modulo_id: 2, descricao: 'Terceira avaliação', titulo: 'Avaliação 3' },
            { modulo_id: 3, descricao: 'Primeira avaliação', titulo: 'Avaliação 1' },
            { modulo_id: 3, descricao: 'Segunda avaliação', titulo: 'Avaliação 2' },
            { modulo_id: 3, descricao: 'Terceira avaliação', titulo: 'Avaliação 3' },
        ]
    })

    await prisma.progressoAluno.createMany({
        data: [
            { aluno_id: 1, apostila_id: 1, avaliacao_id: 1, video_id: 1, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 1, apostila_id: 2, avaliacao_id: 2, video_id: 2, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 1, apostila_id: 3, avaliacao_id: 3, video_id: 3, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 2, apostila_id: 4, avaliacao_id: 4, video_id: 4, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 2, apostila_id: 5, avaliacao_id: 5, video_id: 5, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 2, apostila_id: 6, avaliacao_id: 6, video_id: 6, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 3, apostila_id: 7, avaliacao_id: 7, video_id: 7, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 3, apostila_id: 8, avaliacao_id: 8, video_id: 8, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
            { aluno_id: 3, apostila_id: 9, avaliacao_id: 9, video_id: 9, baixou_apostila: false, progresso_video: 0, nota_avaliacao: 0, data_ultima_interacao: new Date() },
        ]
    })    

})()