/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Create the UUID extension
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  // Create the players table
  await knex.schema.createTable('players', function (table) {
    table.increments('id').primary();
    table.string('nickname').unique().notNullable();
    table.string('password').notNullable();
  });

  // Create the games table
  await knex.schema.createTable('games', function (table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('player_id').unsigned().notNullable();
    table.foreign('player_id').references('players.id');
    table.integer('number').notNullable();
    table.boolean('win_status').defaultTo(false);
    table.timestamp('played_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Drop the games table if it exists
  await knex.schema.dropTableIfExists('games');

  // Drop the players table if it exists
  await knex.schema.dropTableIfExists('players');

  // Optional: Drop the UUID extension
  await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
