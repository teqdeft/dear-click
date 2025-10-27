exports.up = function (knex) {
  return knex.schema.createTable("password_resets", function (table) {
    table.increments("id").primary();
    table.integer("user_id").notNullable();
    table.string("token", 255).nullable();
    table.timestamp("expires_at").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("password_resets");
};
