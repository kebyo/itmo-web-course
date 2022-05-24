import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1653370963694 implements MigrationInterface {
    name = 'Init1653370963694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("name" character varying(255) NOT NULL, "email" character varying(255), "id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "creator_user_id" integer, "password_hash" character varying(255) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promocodes" ("product_name" text NOT NULL, "product_url" text NOT NULL, "sale_size" double precision NOT NULL, "description" text NOT NULL, "code" character varying(10) NOT NULL, "id" SERIAL NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "PK_cfd49e54a2ddfbc02636f8f2904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fdb0081b8a032125282add5dfee" FOREIGN KEY ("creator_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "promocodes" ADD CONSTRAINT "FK_7cfa60f3e43950b514f9450549f" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promocodes" DROP CONSTRAINT "FK_7cfa60f3e43950b514f9450549f"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fdb0081b8a032125282add5dfee"`);
        await queryRunner.query(`DROP TABLE "promocodes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
