import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('keywords', function (table) {
      table.increments();
      table.string("keyword", 64).notNullable();
      table.integer("product_id").unsigned();
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("keywords")
}

