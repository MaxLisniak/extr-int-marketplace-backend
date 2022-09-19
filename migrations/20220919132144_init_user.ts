import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
      table.increments();
      table.string('first_name', 32).notNullable();
      table.string('last_name', 32);
      table.string('password_hash').notNullable();
      table.string('email', 64).notNullable().unique();
      table.string('refresh_token');
      table.boolean('is_admin');
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('users')
}

