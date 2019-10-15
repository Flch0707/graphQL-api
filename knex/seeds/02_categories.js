
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'spirits'},
        {id: 2, name: 'Undistilled'},
        {id: 3, name: 'soft drinks'}
      ]);
    });
};
