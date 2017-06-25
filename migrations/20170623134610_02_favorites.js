exports.up = function(knex, Promise) {
  return knex.schema.createTable("favorites", table => {
    table.increments("favorite_id").primary();
    table
      .integer("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("cascade")
      .notNullable();
    table.text("url").notNullable();
    table.text("tags").notNullable();
    table.text("lat").notNullable();
    table.text("lng").notNullable();
  });
};

exports.down = function(knex, Promise) {
  // return knex.schema.dropTable("favorites");
  return knex.raw("DROP TABLE favorites CASCADE");
};
