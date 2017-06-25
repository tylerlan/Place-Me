exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users").del().then(function() {
    // Inserts seed entries
    return knex("users")
      .insert([
        {
          user_id: 1,
          username: "Ronan",
          hashed_password:
            "deawbopjjifogzepgksvpocqcwvpskjcxvvrqfscghwmwrhvwhdznfemaapk"
        }
      ])
      .then(() => {
        return knex.raw(
          "SELECT setval('users_user_id_seq', (SELECT MAX(user_id) FROM users));"
        );
      });
  });
};
