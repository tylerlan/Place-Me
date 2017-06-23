"sue strict";

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/place_me_dev"
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/place_me_test"
  },
  production: {}
};
