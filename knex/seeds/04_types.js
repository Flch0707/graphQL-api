
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {id: 1, name: 'Malt Whisky',alcohol:1},
        {id: 2, name: 'japanese',alcohol:1},
        {id: 3, name: 'Haut-Medoc',alcohol:6},
        {id: 4, name: 'Bordeaux',alcohol:6},
        {id: 5, name: 'IPA',alcohol:5},
        {id: 6, name: 'mixer',alcohol:8},
        {id: 7, name: 'lagger',alcohol:5},
      ]);
    });
};
