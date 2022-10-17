/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('keywords').del()
  await knex('keywords').insert([
    { id: 1, keyword: 'rowling' },
    { id: 2, keyword: 'magic' },
    { id: 3, keyword: 'hogwards' }
  ]);
};
