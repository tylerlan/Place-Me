exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", table => {
    table.increments("comment_id").primary();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade")
      .notNullable();
    table
      .integer("favorite_id")
      .references("favorite_id")
      .inTable("favorites")
      .onDelete("cascade")
      .notNullable();
    table.text("comment");
  });
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable("comments");
  return knex.raw("DROP TABLE comments CASCADE");
};
