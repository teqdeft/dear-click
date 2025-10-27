exports.up = function (knex) {
  return knex.schema.createTable("battles", function (table) {
    table.increments("id").primary();

    table
      .integer("interestId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("interests")
      .onDelete("CASCADE");

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.text("caption");
    table.string("media_url");
    table.string("location");

    table.integer("like_count").defaultTo(0);
    table.integer("comment_count").defaultTo(0);
    table.integer("share_count").defaultTo(0);
    table.integer("save_count").defaultTo(0);

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("battles");
};
