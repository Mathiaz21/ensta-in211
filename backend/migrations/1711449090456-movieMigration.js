import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class MovieMigration1711449090456 {
    name = 'MovieMigration1711449090456'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" character varying NOT NULL,
                "imageUrl" character varying NOT NULL,
                "date" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
