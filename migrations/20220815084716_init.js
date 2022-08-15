/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments();
      table.string('first_name', 32).notNullable();
      table.string('last_name', 32);
    })
    .createTable('categories', function (table) {
      table.increments();
      table.string("name", 32).unique().notNullable();
    })
    .createTable('subcategories', function (table) {
      table.increments();
      table.string("name", 32).unique().notNullable();

      table.integer('category_id').unsigned();
      table.foreign('category_id')
        .references("id")
        .inTable("categories")
        .onDelete("SET NULL");

    })
    .createTable('products', function (table) {
      table.increments();
      table.string('name', 64).notNullable();
      table.string('description', 512);
      table.string('image_url');

      table.integer('subcategory_id').unsigned();
      table.foreign('subcategory_id')
        .references("id")
        .inTable("subcategories")
        .onDelete("SET NULL");
    })
    .createTable('comments', function (table) {
      table.increments();
      table.string('text', 512).notNullable();
      table.datetime('created').notNullable();

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
    .createTable('prices', function (table) {
      table.increments();
      table.integer('price').notNullable();
      table.date('date').notNullable().unique();

      table.integer("product_id").unsigned();
      table.foreign("product_id")
        .references('id')
        .inTable("products")
        .onDelete("CASCADE");
    })
    .createTable('favorites', function (table) {
      table.increments();

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
    .createTable('keywords', function (table) {
      table.increments();
      table.string("keyword", 64).notNullable();

      table.integer("product_id").unsigned();
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
    })
    .createTable('characteristic_names', function (table) {
      table.increments();
      table.string("name", 32).unique().notNullable();
    })
    .createTable('characteristics', function (table) {
      table.increments();
      table.string("value", 64);

      table.integer("product_id").unsigned();
      table.integer("characteristic_name_id").unsigned();
      table.foreign("product_id")
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table.foreign("characteristic_name_id")
        .references("id")
        .inTable("characteristic_names")
        .onDelete("CASCADE");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .table("products", function (table) {
      table.dropForeign("subcategory_id");
    })
    .table("subcategories", function (table) {
      table.dropForeign("category_id");
    })
    .table("comments", function (table) {
      table.dropForeign("user_id");
      table.dropForeign("product_id");
    })
    .table("prices", function (table) {
      table.dropForeign("product_id");
    })
    .table("favorites", function (table) {
      table.dropForeign("user_id");
      table.dropForeign("product_id");
    })
    .table("keywords", function (table) {
      table.dropForeign("product_id");
    })
    .table("characteristics", function (table) {
      table.dropForeign("product_id");
      table.dropForeign("characteristic_name_id");
    })
    .dropTableIfExists('users')
    .dropTableIfExists('categories')
    .dropTableIfExists('subcategories')
    .dropTableIfExists('products')
    .dropTableIfExists('comments')
    .dropTableIfExists('prices')
    .dropTableIfExists('favorites')
    .dropTableIfExists('keywords')
    .dropTableIfExists('characteristic_names')
    .dropTableIfExists('characteristics')
};
