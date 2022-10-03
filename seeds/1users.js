const { generatePasswordHash } = require("../dist/src/services/users");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      email: 'john@mail.com',
      first_name: "john",
      password_hash: await generatePasswordHash("john"),
      is_admin: false
    },
    {
      id: 2,
      email: 'matt@mail.com',
      first_name: "matt",
      password_hash: await generatePasswordHash("matt"),
      is_admin: false
    },
    {
      id: 3,
      email: 'rick@mail.com',
      first_name: "rick",
      password_hash: await generatePasswordHash("rick"),
      is_admin: false
    }
  ]);
};
