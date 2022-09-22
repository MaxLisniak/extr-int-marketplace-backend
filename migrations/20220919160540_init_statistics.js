/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
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


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("statistics");
}

