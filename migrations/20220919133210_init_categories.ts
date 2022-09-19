import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('categories', function (table) {
      table.increments();
      table.string("name", 32).unique().notNullable();
      table.integer("parent_id").unsigned();
      table.foreign('parent_id')
        .references("id")
        .inTable("categories")
        .onDelete("SET NULL");
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('categories')
}

