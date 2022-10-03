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
      category_id: 5,
    },
    {
      id: 2,
      name: "Apple iPhone 14 Midnight",
      description: "Apple iPhone in midnight color",
      price: 799,
      category_id: 3,
    },
    {
      id: 3,
      name: "Apple iPhone 14 Starlight",
      description: "Apple iPhone in starlight color",
      price: 799,
      category_id: 3,
    },
    {
      id: 4,
      name: "Apple iPhone 14 Blue",
      description: "Apple iPhone in blue color",
      price: 799,
      category_id: 3,
    },
    {
      id: 5,
      name: "Apple iPhone 14 (PRODUCT)RED",
      description: "Apple iPhone in red color",
      price: 799,
      category_id: 3,
    },
    {
      id: 6,
      name: "Samsung Smart TV",
      description: "Samsung TV",
      price: 1299,
      category_id: 4,
    },
  ]);
};
