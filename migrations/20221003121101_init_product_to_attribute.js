/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('attribute_to_product', function (table) {
      table.increments();
      table.integer("attribute_value_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("attribute_value_id")
        .references("id")
        .inTable("attribute_values")
        .onDelete("CASCADE");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.unique(['attribute_value_id', 'product_id'])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("attribute_to_product")
};
