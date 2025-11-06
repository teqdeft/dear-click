exports.up = function (knex) {
  return knex.schema.createTable("post_shares", function (table) {
    table.increments("id").primary();
    table
      .integer("postId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table
      .integer("senderId") // who is sharing
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("receiverId") // who receives
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("post_shares");
};
