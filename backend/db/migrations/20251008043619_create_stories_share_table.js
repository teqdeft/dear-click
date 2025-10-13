exports.up = function (knex) {
    return knex.schema.createTable("stories_shares", function (table) {
        table.increments("id").primary();
        table
            .integer("storyId")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("stories")
            .onDelete("CASCADE");
        table
            .integer("senderId") // who is sharing
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table
            .integer("receiverId") // who receives
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.boolean("status").defaultTo(true);
        table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        table.timestamp("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("stories_shares");
};
