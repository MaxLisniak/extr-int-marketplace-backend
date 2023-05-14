/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {
      id: 1,
      text: 'I like new black iPhone',
      user_id: 1,
      product_id: 2,
      rating: 5,
    },
    {
      id: 2,
      text: 'I like new starlight iPhone',
      user_id: 1,
      product_id: 3,
      rating: 5,
    },
    {
      id: 3,
      text: 'I like new blue iPhone',
      user_id: 1,
      product_id: 4,
      rating: 5,
    },
    {
      id: 4,
      text: 'I like new red iPhone',
      user_id: 1,
      product_id: 5,
      rating: 5,
    },
    {
      id: 5,
      text: "I don't this new TV",
      user_id: 2,
      product_id: 6,
      rating: 2,
    },
    {
      id: 6,
      text: 'I like Harry Potter',
      user_id: 3,
      product_id: 1,
      rating: 4,
    }
  ]);
};
