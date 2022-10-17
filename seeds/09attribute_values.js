/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('attribute_values').del()
  await knex('attribute_values').insert([
    { id: 1, value: 'Midnight', attribute_name_id: 1 },
    { id: 2, value: 'Starlight', attribute_name_id: 1 },
    { id: 3, value: 'Blue', attribute_name_id: 1 },
    { id: 4, value: 'PRODUCT(RED)', attribute_name_id: 1 },
    { id: 5, value: "128GB", attribute_name_id: 2 },
    { id: 6, value: "250", attribute_name_id: 3 },
    { id: 7, value: "6in", attribute_name_id: 4 },
    { id: 8, value: "40in", attribute_name_id: 4 },
  ]);
};
