/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('category_to_product', function (table) {
      table.increments();
      table.integer("category_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.unique(['category_id', 'product_id'])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("category_to_product")
};
