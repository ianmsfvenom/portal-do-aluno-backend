const prisma = require('../config/prisma');

(async () => {
    await prisma.plano.createMany({ 
        data: [{
            nome: 'Básico',
            descricao: 'Com o plano básico o aluno poderá cursar os módulos EAD contendo as apostilas, roteiros de práticas e avaliações de aprendizagens. Poderão participar de grupos de whatsapp fechados apenas para estes alunos do curso.'
        }, {
            nome: 'Empreendedor',
            descricao: 'Com o plano empreendedor o aluno poderá cursar os módulos EAD contendo as apostilas, roteiros de práticas e avaliações de aprendizagens, mentorias online com professores especialistas sobre os módulos dos cursos e terão acesso aos eventos promovidos pela plataforma e cursos de capacitação de forma gratuita.'
        }, {
            nome: 'Startup',
            descricao: 'Com o plano startup o aluno poderá cursar os módulos EAD contendo as apostilas, roteiros de práticas e avaliações de aprendizagens, mentorias online com professores especialistas sobre os módulos dos cursos e terão acesso aos eventos promovidos pela plataforma e cursos de capacitação de forma gratuita. Participarão de modelagem de negócios, encubação e aceleração dos empreendimentos com opção de parceria com a plataforma EAD com parcela de ¼ do negócio pela parceria com assinatura de contrato na própria plataforma. Os alunos optantes por esta modalidade serão acompanhados pelos especialistas e receberão feedbacks constantes do negócio e das oportunidades.'
        }]
    })
})();