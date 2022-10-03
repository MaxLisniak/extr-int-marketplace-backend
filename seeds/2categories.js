/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {
      id: 1,
      name: 'Electronics',
    },
    {
      id: 2,
      name: 'Smartphones',
      parent_id: 1
    },
    {
      id: 3,
      name: 'Apple iPhone',
      parent_id: 2
    },
    {
      id: 4,
      name: 'TV',
      parent_id: 1
    },
    {
      id: 5,
      name: 'Books',
    },
  ]);
};
