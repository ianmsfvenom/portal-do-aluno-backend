const prisma = require('../config/prisma');
const { encryptPassword } = require('../utils/password-utils');

(async () => {
    await prisma.usuario.createMany({ 
        data: [{
            nome: 'Ian Pablo',
            email: 'ianpablo@aluno.com',
            senha: await encryptPassword('123456'),
            tipo: 'aluno',
            plano_id: 1
        }]
    })
})();