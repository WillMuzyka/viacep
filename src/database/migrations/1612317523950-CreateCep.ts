import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCep1612317523950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'cep',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'logradouro',
            type: 'varchar',
          },
          {
            name: 'complemento',
            type: 'varchar',
          },
          {
            name: 'bairro',
            type: 'varchar',
          },
          {
            name: 'localidade',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'ibge',
            type: 'varchar',
          },
          {
            name: 'gia',
            type: 'varchar',
          },
          {
            name: 'ddd',
            type: 'varchar',
          },
          {
            name: 'siafi',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('address');
  }
}
