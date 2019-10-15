exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("bottles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("bottles").insert([
        {
          id: 1,
          name: "comptesse clemence",
          alcohol_volume: 13.5,
          format: 70,
          price: 7.5,
          URL: null,
          rate: 5,
          empty: true,
          category: 2,
          type: 3,
          alcohol: 6
        },
        {
          id: 2,
          name: "Nikka",
          alcohol_volume: 70,
          format: 40,
          price: 32,
          URL: null,
          rate: 4,
          empty: false,
          category: 1,
          type: 2,
          alcohol: 1
        },
        {
          id: 3,
          name: "heineken",
          alcohol_volume: 5.5,
          format: 33,
          price: 1,
          URL: null,
          rate: 1,
          category: 2,
          type: 5,
          alcohol: 2
        }
      ]);
    });
};
