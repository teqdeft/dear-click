exports.up = function (knex) {
  return knex.schema.createTable("highlight_stories", function (table) {
    table.increments("id").primary();

    table
      .integer("highlight_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("highlights")
      .onDelete("CASCADE");

    table
      .integer("story_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("stories")
      .onDelete("CASCADE");

    table.boolean("status").defaultTo(0);
    table.timestamp("added_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("highlight_stories");
};
