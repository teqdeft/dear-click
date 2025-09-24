/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("otps", function (table) {
    table.increments("id").primary();
    table.string("email");
    table.string("phone");
    table.string("otp");
    table.timestamp("expiresAt");
    table.boolean("isUsed").defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("otps");
};
