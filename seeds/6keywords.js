/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('keywords').del()
  await knex('keywords').insert([
    { id: 1, keyword: 'rowling', product_id: 1 },
    { id: 2, keyword: 'magic', product_id: 1 },
    { id: 3, keyword: 'hogwards', product_id: 1 }
  ]);
};
