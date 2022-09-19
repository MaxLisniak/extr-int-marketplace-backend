import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('characteristic_values', function (table) {
      table.increments();
      table.string("value", 256);
      table.integer("product_id").unsigned();
      table.integer("characteristic_name_id").unsigned();
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.foreign("characteristic_name_id")
        .references("id")
        .inTable("characteristic_names")
        .onDelete("CASCADE");
      table.unique(["product_id", 'characteristic_name_id']);
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("characteristic_values")
}

