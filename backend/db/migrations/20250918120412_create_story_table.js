exports.up = function (knex) {
  return knex.schema.createTable("story", (table) => {
    table.increments("id").primary();

    table
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.string("media_url").nullable(); // file path
    table.enu("type", ["image", "video", "other"]).nullable();
    table.text("caption").nullable();
    table.timestamp("expiry_at").notNullable(); // auto expire in 24 hrs
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("story");
};
