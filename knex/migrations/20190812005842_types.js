exports.up = function(knex) {
    return knex.schema.createTable('types', function(table) {
        table.increments('id');
        table.string('name',30).notNullable();
        table.integer('alcohol').references('id').inTable('alcohols')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('types');
};
