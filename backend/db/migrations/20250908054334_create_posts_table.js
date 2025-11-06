exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().nullable(); // make nullable
    table.text("caption").nullable();
    table.string("media_url").nullable();
    table.string("location").nullable();
    table.integer("like_count").defaultTo(0);
    table.integer("comment_count").defaultTo(0);
    table.integer("share_count").defaultTo(0);
    table.integer("save_count").defaultTo(0);
    table.timestamps(true, true);

    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
