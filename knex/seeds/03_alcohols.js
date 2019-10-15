
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('alcohols').del()
    .then(function () {
      // Inserts seed entries
      return knex('alcohols').insert([
        {id: 1, name: 'whisky',category:1},
        {id: 2, name: 'gin',category:1},
        {id: 3, name: 'rhum',category:1},
        {id: 4, name: 'vodka',category:1},
        {id: 5, name: 'beer',category:2},
        {id: 6, name: 'wine',category:2},
        {id: 7, name: 'cider',category:2},
        {id: 8, name: 'tonic water',category:3}

      ]);
    });
};
