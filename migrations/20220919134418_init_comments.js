/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('comments', function (table) {
      table.increments();
      table.string('text', 512).notNullable();
      table.timestamp('created').notNullable()
        .defaultTo(knex.fn.now())
      table.integer("user_id").unsigned();
      table.integer("product_id").unsigned();
      table.foreign("user_id")
        .references("id")
        .inTable("users")
        .onDelete("SET NULL");
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments")
}

