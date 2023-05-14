/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('categories', function (table) {
      table.increments();
      table.string("name", 32).unique().notNullable();
      table.integer("parent_id").unsigned();
      table.foreign('parent_id')
        .references("id")
        .inTable("categories")
        .onDelete("SET NULL");
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('categories')
}

