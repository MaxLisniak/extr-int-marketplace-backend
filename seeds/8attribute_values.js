/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('attribute_values').del()
  await knex('attribute_values').insert([
    { id: 1, value: 'Midnight' },
    { id: 2, value: 'Starlight' },
    { id: 3, value: 'Blue' },
    { id: 4, value: 'PRODUCT(RED)' },
    { id: 5, value: "128GB" },
    { id: 6, value: "250" },
    { id: 7, value: "6in" },
    { id: 8, value: "40in" },
  ]);
};
