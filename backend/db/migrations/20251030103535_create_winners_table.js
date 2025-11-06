exports.up = function (knex) {
  return knex.schema.createTable("winners", function (table) {
    table.increments("id").primary();

    table
      .integer("battleId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("battles")
      .onDelete("SET NULL");

    table
      .integer("postId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("posts")
      .onDelete("SET NULL");

    table
      .integer("userId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");

    table.integer("like_count").defaultTo(0);
    table.date("week_start");
    table.date("week_end");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("winners");
};
