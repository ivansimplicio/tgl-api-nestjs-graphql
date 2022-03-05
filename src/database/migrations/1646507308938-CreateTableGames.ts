import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class CreateTableGames1646507308938 implements MigrationInterface {
  tableName = 'games';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'type',
            type: 'varchar(30)',
            isUnique: true,
            isNullable: false
          },
          {
            name: 'description',
            type: 'varchar(255)',
            isNullable: false
          },
          {
            name: 'range',
            type: 'int',
            isNullable: false
          },
          {
            name: 'price',
            type: 'float',
            isNullable: false
          },
          {
            name: 'maxNumber',
            type: 'int',
            isNullable: false
          },
          {
            name: 'color',
            type: 'varchar(15)',
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}