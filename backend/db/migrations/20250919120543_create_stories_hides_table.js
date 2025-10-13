// migrations/20250919120000_create_story_hides.js
exports.up = function (knex) {
    return knex.schema.createTable("stories_hides", function (table) {
        table.increments("id").primary();
        table
            .integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table
            .integer("hiddenUserId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("stories_hides");
};
