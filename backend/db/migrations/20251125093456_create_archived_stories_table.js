exports.up = function (knex) {
  return knex.schema.createTable("archived_stories", (table) => {
    table.increments("id").primary();
    table
      .integer("story_id")
      .unsigned()
      .references("id")
      .inTable("stories")
      .onDelete("CASCADE");
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("media_url").notNullable();
    table.enu("type", ["image", "video", "other"]).nullable();
    table.timestamp("created_at").notNullable();
    table.timestamp("archived_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("archived_stories");
};
