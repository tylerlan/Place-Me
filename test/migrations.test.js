"use strict";

process.env.NODE_ENV = "test";

const { assert } = require("chai");
const { suite, test } = require("mocha");
const knex = require("../knex");
const { addDatabaseHooks } = require("./utils");
suite(
  "migrations",
  addDatabaseHooks(() => {
    test("users columns", done => {
      knex("users")
        .columnInfo()
        .then(actual => {
          let expected = {
            id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('users_id_seq'::regclass)"
            },

            username: {
              type: "text",
              minLength: 5,
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            hashed_password: {
              type: "character varying",
              maxLength: 255,
              nullable: false,
              defaultValue: null
            }
          };

          for (let column in expected) {
            assert.deepEqual(
              actual[column],
              expected[column],
              `Column ${column} is not the same`
            );
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
            id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('comments_id_seq'::regclass)"
            },

            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            favorites_id: {
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
            assert.deepEqual(
              actual[column],
              expected[column],
              `Column ${column} is not the same`
            );
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
            id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('ratings_id_seq'::regclass)"
            },

            user_id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: null
            },

            favorites_id: {
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
            assert.deepEqual(
              actual[column],
              expected[column],
              `Column ${column} is not the same`
            );
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
            id: {
              type: "integer",
              maxLength: null,
              nullable: false,
              defaultValue: "nextval('ratings_id_seq'::regclass)"
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
            assert.deepEqual(
              actual[column],
              expected[column],
              `Column ${column} is not the same`
            );
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });
  })
);
