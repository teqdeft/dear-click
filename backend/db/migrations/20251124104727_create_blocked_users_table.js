exports.up = function (knex) {
  return knex.schema.createTable("blocked_users", (table) => {
    table.increments("id").primary();

    table
      .integer("blocker_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("blocked_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.unique(["blocker_id", "blocked_id"]); // prevent duplicate blocks

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("blocked_users");
};
