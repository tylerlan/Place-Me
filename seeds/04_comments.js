exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments").del().then(function() {
    // Inserts seed entries
    return knex("comments")
      .insert([
        {
          comment_id: 1,
          user_id: 1,
          picture_id: 1,
          comment: "this place is awesome"
        }
      ])
      .then(() => {
        return knex.raw(
          "SELECT setval('comments_comment_id_seq', (SELECT MAX(comment_id) FROM comments));"
        );
      });
  });
};
