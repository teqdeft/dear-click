exports.up = function (knex) {
  return knex.schema.createTable("user_details", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table.string("bio").nullable().defaultTo(null);
    table.string("website").nullable().defaultTo(null);
    table.string("gender").nullable().defaultTo(null);
    table.string("date_of_birth").nullable().defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    // relation
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_details");
};
