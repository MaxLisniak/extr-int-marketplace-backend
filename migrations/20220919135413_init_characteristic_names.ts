import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("characteristic_names")
}

