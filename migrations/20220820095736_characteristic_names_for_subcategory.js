/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.integer("for_subcategory_id").unsigned()
      table.foreign("for_subcategory_id")
        .references("id")
        .inTable("subcategories")
        .onDelete("SET NULL");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.dropForeign("for_subcategory_id");
      table.dropColumn("for_subcategory_id");
    })

};
