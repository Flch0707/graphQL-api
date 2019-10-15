exports.up = function(knex) {
    return knex.schema.createTable('alcohols', function(table) {
        table.increments('id');
        table.string('name',30).notNullable();
        table.integer('category').references('id').inTable('categories')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('alcohols');
};
