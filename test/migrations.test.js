"use strict";

process.env.NODE_ENV = "test";

const { assert } = require("chai");
const { suite, test } = require("mocha");
const knex = require("../knex");
const { addDatabaseHooks } = require("./utils");
suite(
  "migrations",
  () => {
    // addDatabaseHooks(() => {
    test("users columns", done => {
      knex("users")
        .columnInfo()
        .then(actual => {
          let expected = {
            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('users_user_id_seq'::regclass)"
            },

            username: {
              type: "character varying",
              maxLength: 255,
              nullable: false,
              defaultValue: null
            },

            hashed_password: {
              type: "character",
              maxLength: 60,
              nullable: false,
              defaultValue: null
            }
          };

          for (let column in expected) {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("favorites columns", done => {
      knex("favorites")
        .columnInfo()
        .then(actual => {
          let expected = {
            favorite_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('favorites_favorite_id_seq'::regclass)"
            },

            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            rating_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            url: {
              type: "text",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            tags: {
              type: "text",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            lat: {
              type: "text",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            lng: {
              type: "text",
              maxLength: null,
              nullable: false,
              defaultValue: null
            }
          };

          for (let column in expected) {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("comments columns", done => {
      knex("comments")
        .columnInfo()
        .then(actual => {
          let expected = {
            comment_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('comments_comment_id_seq'::regclass)"
            },

            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            favorite_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            comment: {
              type: "text",
              maxLength: null,
              nullable: true,
              defaultValue: null
            }
          };

          for (let column in expected) {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("ratings columns", done => {
      knex("ratings")
        .columnInfo()
        .then(actual => {
          let expected = {
            rating_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('ratings_rating_id_seq'::regclass)"
            },

            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            favorite_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            rating: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            }
          };

          for (let column in expected) {
            assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });
  }
  // })
);
