import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668471088619 implements MigrationInterface {
    name = 'default1668471088619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`date\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`date\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
