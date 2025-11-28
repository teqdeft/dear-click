exports.up = function (knex) {
  return knex.schema.createTable("story_status", (table) => {
    table.increments("id").primary();

    table
      .integer("storyId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stories")
      .onDelete("CASCADE");

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.boolean("seen").defaultTo(0);

    table.timestamp("seen_at").nullable();

    table.unique(["storyId", "userId"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("story_status");
};
