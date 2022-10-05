/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('attribute_pairs', function (table) {
      table.increments();
      table.integer("attribute_name_id").unsigned();
      table.integer("attribute_value_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("attribute_name_id")
        .references("id")
        .inTable("attribute_names")
        .onDelete("CASCADE");
      table.foreign("attribute_value_id")
        .references("id")
        .inTable("attribute_values")
        .onDelete("SET NULL");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.unique(['attribute_name_id', 'product_id'])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("attribute_pairs")
};
