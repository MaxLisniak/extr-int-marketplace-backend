/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('attribute_names').del()
  await knex('attribute_names').insert([
    { id: 1, name: 'Color' },
    { id: 2, name: 'Storage' },
    { id: 3, name: 'Pages' },
    { id: 4, name: 'Display size' }
  ]);
};
