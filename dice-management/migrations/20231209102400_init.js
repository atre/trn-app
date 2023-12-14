/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('players', function (table) {
      table.increments('id').primary();
      table.string('nickname').unique().notNullable();
      table.string('password').notNullable();
    })
    .then(() => {
      return knex.schema.createTable('games', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()')); // Use UUID
        table.integer('player_id').unsigned().notNullable();
        table.foreign('player_id').references('players.id');
        table.integer('number').notNullable();
        table.boolean('win_status').defaultTo(false);
        table.timestamp('played_at').defaultTo(knex.fn.now());
      });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('games')
    .then(() => knex.schema.dropTable('players'));
};
