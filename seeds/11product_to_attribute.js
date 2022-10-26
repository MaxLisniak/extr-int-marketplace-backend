/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('product_to_attribute').del()
  await knex('product_to_attribute').insert([
    { id: 1, attribute_value_id: 1, product_id: 2 },
    { id: 2, attribute_value_id: 2, product_id: 3 },
    { id: 3, attribute_value_id: 3, product_id: 4 },
    { id: 4, attribute_value_id: 4, product_id: 5 },
    { id: 5, attribute_value_id: 5, product_id: 2 },
    { id: 6, attribute_value_id: 5, product_id: 3 },
    { id: 7, attribute_value_id: 5, product_id: 4 },
    { id: 8, attribute_value_id: 5, product_id: 5 },
    { id: 9, attribute_value_id: 7, product_id: 2 },
    { id: 10, attribute_value_id: 7, product_id: 3 },
    { id: 11, attribute_value_id: 7, product_id: 4 },
    { id: 12, attribute_value_id: 7, product_id: 5 },
    { id: 13, attribute_value_id: 8, product_id: 6 },
    { id: 14, attribute_value_id: 6, product_id: 1 },
  ]);
};