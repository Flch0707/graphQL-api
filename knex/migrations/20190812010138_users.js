exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('email',50).notNullable();
        table.string('password').notNullable();
        table.string('role',30).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());

      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
