/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.dropForeign("for_subcategory_id")
      table.foreign("for_subcategory_id")
        .references("id")
        .inTable("subcategories")
        .onDelete("CASCADE");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.dropForeign("for_subcategory_id")
      table.foreign("for_subcategory_id")
        .references("id")
        .inTable("subcategories")
        .onDelete("SET NULL");
    })
};
