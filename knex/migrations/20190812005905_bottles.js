

exports.up = function(knex) {
    return knex.schema.createTable('bottles', function(table) {
        table.increments('id');
        table.string('name',30).notNullable();
        table.float('alcohol_volume');
        table.float('format');
        table.float('price');
        table.text('URL');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.integer('rate');
        table.boolean('empty').notNullable().defaultTo(false);

        table.integer('category').references('id').inTable('categories');

        table.integer('type').references('id').inTable('types');

        table.integer('alcohol').references('id').inTable('alcohols')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('bottles');
};
