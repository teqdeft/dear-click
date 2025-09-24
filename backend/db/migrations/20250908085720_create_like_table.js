exports.up = function (knex) {
  return knex.schema.createTable("likes", (table) => {
    table.increments("id").primary();
    table
      .integer("postId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.unique(["postId", "userId"]); // prevent duplicate likes
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("likes");
};
