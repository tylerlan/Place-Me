exports.up = function(knex, Promise) {
  return knex.schema.createTable("pictures", table => {
    table.increments("picture_id").primary();
    table.text("url").notNullable();
    table.text("tags").notNullable();
    table.text("lat").notNullable();
    table.text("lng").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("pictures");
};
