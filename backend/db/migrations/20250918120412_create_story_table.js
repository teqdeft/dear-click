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

    table.string("media_url").notNullable();
    table.enu("type", ["image", "video"]).notNullable();
    table.integer("duration").defaultTo(5);
    table.text("caption").nullable();

    table.timestamp("expiry_at").notNullable();
    table.integer("status").defaultTo(1);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("stories");
};
