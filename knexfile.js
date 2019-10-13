// Update with your config settings.
const {ACCESS_DB} = require("./env/ENV");
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'myBar',
      user:     'postgres',
      password: ACCESS_DB
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  },
/*
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
*/
};
