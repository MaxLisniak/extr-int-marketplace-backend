/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('category_to_product').del()
  await knex('category_to_product').insert([
    { id: 1, category_id: 5, product_id: 1 },

    { id: 2, category_id: 3, product_id: 2 },
    { id: 3, category_id: 3, product_id: 3 },
    { id: 4, category_id: 3, product_id: 4 },
    { id: 5, category_id: 3, product_id: 5 },

    { id: 6, category_id: 2, product_id: 2 },
    { id: 7, category_id: 2, product_id: 3 },
    { id: 8, category_id: 2, product_id: 4 },
    { id: 9, category_id: 2, product_id: 5 },

    { id: 10, category_id: 1, product_id: 2 },
    { id: 11, category_id: 1, product_id: 3 },
    { id: 12, category_id: 1, product_id: 4 },
    { id: 13, category_id: 1, product_id: 5 },

    { id: 14, category_id: 4, product_id: 6 },
    { id: 15, category_id: 1, product_id: 6 },
  ]);
};
