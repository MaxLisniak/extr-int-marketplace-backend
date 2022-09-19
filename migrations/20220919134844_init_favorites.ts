import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('favorites', function (table) {
      table.increments();
      table.integer("user_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("favorites")
}

