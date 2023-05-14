/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("products", function (table) {
      table.integer("brand_id").unsigned();
      table.foreign("brand_id")
        .references("id")
        .inTable("brands")
        .onDelete("SET NULL");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("products", function (table) {
      table.dropForeign("brand_id")
      table.dropColumn("brand_id")
    })
};
