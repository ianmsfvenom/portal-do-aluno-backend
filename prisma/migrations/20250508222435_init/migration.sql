-- CreateTable
CREATE TABLE `alunos_turmas` (
    `aluno_id` INTEGER NOT NULL,
    `turma_id` INTEGER NOT NULL,

    INDEX `turma_id`(`turma_id`),
    PRIMARY KEY (`aluno_id`, `turma_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `apostilas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modulo_id` INTEGER NULL,
    `titulo` VARCHAR(100) NULL,
    `arquivo_url` TEXT NULL,

    INDEX `modulo_id`(`modulo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modulo_id` INTEGER NULL,
    `titulo` VARCHAR(100) NULL,
    `descricao` TEXT NULL,

    INDEX `modulo_id`(`modulo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(100) NULL,
    `descricao` TEXT NULL,
    `categoria` VARCHAR(50) NULL,
    `carga_horaria` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modulos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curso_id` INTEGER NULL,
    `titulo` VARCHAR(100) NULL,
    `ordem` INTEGER NULL,

    INDEX `curso_id`(`curso_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parcerias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aluno_id` INTEGER NULL,
    `descricao_projeto` TEXT NULL,
    `percentual_plataforma` DECIMAL(5, 2) NULL,
    `data_assinatura` DATE NULL,
    `contrato_url` TEXT NULL,

    INDEX `aluno_id`(`aluno_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NULL,
    `descricao` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `progresso_aluno` (
    `aluno_id` INTEGER NOT NULL,
    `video_id` INTEGER NOT NULL,
    `apostila_id` INTEGER NOT NULL,
    `avaliacao_id` INTEGER NOT NULL,
    `progresso_video` INTEGER NULL,
    `baixou_apostila` BOOLEAN NULL,
    `nota_avaliacao` DECIMAL(5, 2) NULL,
    `data_ultima_interacao` DATETIME(0) NULL,

    INDEX `apostila_id`(`apostila_id`),
    INDEX `avaliacao_id`(`avaliacao_id`),
    INDEX `video_id`(`video_id`),
    PRIMARY KEY (`aluno_id`, `video_id`, `apostila_id`, `avaliacao_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NULL,
    `curso_id` INTEGER NULL,
    `professor_id` INTEGER NULL,
    `data_inicio` DATE NULL,
    `data_fim` DATE NULL,

    INDEX `curso_id`(`curso_id`),
    INDEX `professor_id`(`professor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `senha` VARCHAR(255) NULL,
    `tipo` ENUM('aluno', 'professor', 'admin') NULL,
    `data_cadastro` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `plano_id` INTEGER NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `plano_id`(`plano_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modulo_id` INTEGER NULL,
    `titulo` VARCHAR(100) NULL,
    `url_video` TEXT NULL,
    `duracao` INTEGER NULL,

    INDEX `modulo_id`(`modulo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alunos_turmas` ADD CONSTRAINT `alunos_turmas_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `alunos_turmas` ADD CONSTRAINT `alunos_turmas_ibfk_2` FOREIGN KEY (`turma_id`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `apostilas` ADD CONSTRAINT `apostilas_ibfk_1` FOREIGN KEY (`modulo_id`) REFERENCES `modulos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `avaliacoes` ADD CONSTRAINT `avaliacoes_ibfk_1` FOREIGN KEY (`modulo_id`) REFERENCES `modulos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `modulos` ADD CONSTRAINT `modulos_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `parcerias` ADD CONSTRAINT `parcerias_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `progresso_aluno` ADD CONSTRAINT `progresso_aluno_ibfk_1` FOREIGN KEY (`aluno_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `progresso_aluno` ADD CONSTRAINT `progresso_aluno_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `progresso_aluno` ADD CONSTRAINT `progresso_aluno_ibfk_3` FOREIGN KEY (`apostila_id`) REFERENCES `apostilas`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `progresso_aluno` ADD CONSTRAINT `progresso_aluno_ibfk_4` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacoes`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_ibfk_1` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_ibfk_2` FOREIGN KEY (`professor_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`plano_id`) REFERENCES `planos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`modulo_id`) REFERENCES `modulos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
