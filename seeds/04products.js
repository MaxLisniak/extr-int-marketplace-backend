/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      id: 1,
      name: "Harry Potter and the Sorcerer's stone",
      description: "Harry Potter book by J.K. Rowling",
      price: 29,
      brand_id: 3,
    },
    {
      id: 2,
      name: "Apple iPhone 14 Midnight",
      description: "Apple iPhone in midnight color",
      price: 799,
      brand_id: 1,
    },
    {
      id: 3,
      name: "Apple iPhone 14 Starlight",
      description: "Apple iPhone in starlight color",
      price: 789,
      brand_id: 1,
    },
    {
      id: 4,
      name: "Apple iPhone 14 Blue",
      description: "Apple iPhone in blue color",
      price: 779,
      brand_id: 1,
    },
    {
      id: 5,
      name: "Apple iPhone 14 (PRODUCT)RED",
      description: "Apple iPhone in red color",
      price: 769,
      brand_id: 1,
    },
    {
      id: 6,
      name: "Samsung Smart TV",
      description: "Samsung TV",
      price: 1299,
      brand_id: 2,
    },
  ]);
};
