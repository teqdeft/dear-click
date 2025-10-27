exports.up = function (knex) {
  return knex.schema.createTable("interests", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name").notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("interests");
};
