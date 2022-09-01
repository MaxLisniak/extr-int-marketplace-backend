/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("users", function (table) {
      table.dropUnique(['first_name', 'last_name']);
      table.unique('email');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("users", function (table) {
      table.unique(['first_name', 'last_name']);
      table.dropUnique('email');
    })
};