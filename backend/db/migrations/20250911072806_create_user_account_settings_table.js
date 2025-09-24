exports.up = function (knex) {
  return knex.schema.createTable("user_account_settings", function (table) {
    table.increments("id").primary();
    table.integer("userId").unsigned().notNullable();
    table
      .string("account_type")
      .nullable()
      .defaultTo("1")
      .comment("1=personal,2=business,3=creator");
    table
      .string("account_privacy")
      .nullable()
      .defaultTo("public")
      .comment("public,private");
    table
      .string("language")
      .nullable()
      .defaultTo("English")
      .comment("language");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    // Relations
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_account_settings");
};
