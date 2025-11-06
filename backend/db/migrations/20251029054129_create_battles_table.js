exports.up = function (knex) {
  return knex.schema.createTable("battles", function (table) {
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
    table
      .integer("interestId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("interests")
      .onDelete("CASCADE");

    table.boolean("isWinner").defaultTo(false);
    table.timestamps(true, true);
    table.unique(["userId", "postId"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("battles");
};
