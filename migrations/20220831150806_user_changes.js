/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .alterTable("users", function (table) {
      table.unique(['first_name', 'last_name']);
      table.string('password_hash').notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("users", function (table) {
      table.dropUnique();
      table.dropColumn('password_hash');
    })
};
