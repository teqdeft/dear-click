exports.up = function (knex) {
  return knex.schema.createTable("story_views", (table) => {
    table.increments("id").primary();

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("story_id")
      .unsigned()
      .references("id")
      .inTable("stories")
      .onDelete("CASCADE");
    table
      .integer("viewer_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.timestamp("viewed_at").defaultTo(knex.fn.now());
    table.unique(["story_id", "viewer_id"]); // viewer must view only once
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("story_views");
};
