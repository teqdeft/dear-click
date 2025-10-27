exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.text("caption").nullable();
    table.string("media_url").nullable();
    table.string("location").nullable();
    // Counters for performance
    table.integer("like_count").defaultTo(0);
    table.integer("comment_count").defaultTo(0);
    table.integer("share_count").defaultTo(0);
    table.integer("save_count").defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    // Relations
    table
      .foreign("userId")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
