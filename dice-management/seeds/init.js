/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('games').del();
  await knex('players').del();

  // Inserts seed entries
  await knex('players').insert([
    {
      id: 1, // Explicitly setting the id
      nickname: 'test',
      // Hashed password for 'test'
      password: 'deeedd9bd52f8cd47e2c6cecdc3195e8:c405c76de7a8c0f9ed248397020f74d66341228a389fbfda1386fbbffe42e2937e22f97749c4b9f8bf46e4d6d56918af7f032231ac121d7e844416bcc3238b28',
    },
    // Add more players here if necessary
  ]);

  // Optionally, insert some games linked to the player 'test'
  // You'll need the ID of the 'test' player if you do this.
};
