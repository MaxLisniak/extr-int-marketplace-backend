/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('characteristic_names', function (table) {
      table.increments();
      table.string("name", 32).notNullable();
      table.integer("category_id").unsigned()
      table.foreign("category_id")
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE");
      table.unique(['name', 'category_id'])
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("characteristic_names")
}

