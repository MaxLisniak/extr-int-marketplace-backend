/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('product_to_keyword', function (table) {
      table.increments();
      table.integer("keyword_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("keyword_id")
        .references("id")
        .inTable("keywords")
        .onDelete("CASCADE");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.unique(['keyword_id', 'product_id'])
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("product_to_keyword")
};
