exports.up = function (knex) {
  return knex.schema.createTable("stories", (table) => {
    table.increments("id").primary();

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("media_url").nullable();
    table.enu("type", ["image", "video", "other"]).nullable();
    table.text("caption").nullable();
    table.boolean("status").defaultTo(0);
    table
      .boolean("is_close_friends")
      .defaultTo(0)
      .comment("0=public,1=close.frd");
    table.boolean("is_hidden").defaultTo(0).comment("0=visible,1=hidden");
    table.timestamp("expiry_at").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("stories");
};
