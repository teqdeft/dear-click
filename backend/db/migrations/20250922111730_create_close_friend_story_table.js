// migrations/20250922120000_create_close_friend_stories.js
exports.up = function (knex) {
    return knex.schema.createTable("close_friend_stories", function (table) {
        table.increments("id").primary();

        table
            .integer("storyId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("stories")
            .onDelete("CASCADE");

        table
            .integer("userId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table
            .integer("closeFriendId")
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
    return knex.schema.dropTableIfExists("close_friend_stories");
};
