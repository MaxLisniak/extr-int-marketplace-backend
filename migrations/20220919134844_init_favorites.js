/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
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


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("favorites")
}

