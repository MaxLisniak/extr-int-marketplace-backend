/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('products', function (table) {
      table.increments();
      table.string('name', 64).notNullable();
      table.string('description', 512);
      table.string('image_url');
      table.float('price');
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("products")
}

