/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.dropUnique('name')
      table.unique(['name', 'for_subcategory_id'])
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("characteristic_names", function (table) {
      table.dropUnique(['name', 'for_subcategory_id'])
      table.unique('name')
    })
};
