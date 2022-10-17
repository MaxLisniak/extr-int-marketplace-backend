/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('product_to_keyword').del()
  await knex('product_to_keyword').insert([
    { id: 1, keyword_id: 1, product_id: 1 },
    { id: 2, keyword_id: 2, product_id: 1 },
    { id: 3, keyword_id: 3, product_id: 1 },
  ]);
};
