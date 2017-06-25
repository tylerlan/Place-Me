exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("favorites").del().then(function() {
    // Inserts seed entries
    return knex("favorites")
      .insert([
        {
          favorite_id: 1,
          user_id: 1,
          picture_id: 1
        }
      ])
      .then(() => {
        return knex.raw(
          "SELECT setval('favorites_favorite_id_seq', (SELECT MAX(favorite_id) FROM favorites));"
        );
      });
  });
};
