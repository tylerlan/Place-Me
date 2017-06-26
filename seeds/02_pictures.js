exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("pictures").then(function() {
    // Inserts seed entries
    return knex("pictures").insert([
      {
        picture_id: 1,
        url: "blahblahblah.com",
        tags: "stretch goal",
        lat: "54.627389",
        lng: "-122.726307"
      }
    ]);
  });
};
