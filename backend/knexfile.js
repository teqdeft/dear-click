// Update with your config settings.
require("dotenv").config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// below is for production database setup

let Database = process.env.DATABASE_NAME;
let user = process.env.DATABASE_USER_NAME;
let password = process.env.DATABASE_PASSWORD;

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      database: Database,
      user: user,
      password: password,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      database: Database,
      user: user,
      password: password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
  production: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      database: Database,
      user: user,
      password: password,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
