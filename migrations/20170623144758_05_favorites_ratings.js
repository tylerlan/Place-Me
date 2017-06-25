exports.up = function(knex, Promise) {
  return knex.schema.alterTable("favorites", table => {
    table
      .integer("rating_id")
      .references("rating_id")
      .inTable("ratings")
      .onDelete("cascade")
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable("favorites");
  // return knex.raw("DROP COLUMN rating_id");
};
