/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('attribute_values', function (table) {
      table.increments();
      table.string("value", 256);
      table.integer("attribute_name_id").unsigned();
      table.foreign("attribute_name_id")
        .references("id")
        .inTable("attribute_names")
        .onDelete("SET NULL");
      table.unique(['value', 'attribute_name_id'])
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("attribute_values")
}

