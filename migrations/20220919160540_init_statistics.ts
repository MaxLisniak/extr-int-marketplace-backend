import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("statistics", function (table) {
      table.increments()
      table.timestamp("datetime").notNullable()
        .defaultTo(knex.fn.now())
      table.integer("price");
      table.integer("product_id").unsigned();
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("statistics");
}

