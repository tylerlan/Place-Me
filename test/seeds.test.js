"use strict";

process.env.NODE_ENV = "test";

const assert = require("chai").assert;
const { suite, test } = require("mocha");
const knex = require("../knex");
const { addDatabaseHooks } = require("./utils");
suite(
  "seeds",
  // addDatabaseHooks(() => {
  () => {
    test("users rows", done => {
      knex("users")
        .orderBy("user_id", "ASC")
        .then(actual => {
          /* eslint-disable max-len */
          let expected = [
            {
              user_id: 1,
              username: "Ronan",
              hashed_password: "deawbopjjifogzepgksvpocqcwvpskjcxvvrqfscghwmwrhvwhdznfemaapk"
            },
            {
              user_id: 2,
              username: "Tyler",
              hashed_password: "jqpzovmzzryiopemglqgusdihbexftypqdkridddpfdhzdprkbxioxapoyju"
            }
          ];

          /* eslint-enable max-len */

          for (let i = 0; i < expected.length; i++) {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("favorites rows", done => {
      knex("favorites")
        .orderBy("favorite_id", "ASC")
        .then(actual => {
          /* eslint-disable max-len */
          let expected = [
            {
              favorite_id: 1,
              user_id: 1,
              picture_id: 1
            }
          ];

          /* eslint-enable max-len */

          for (let i = 0; i < expected.length; i++) {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("comments rows", done => {
      knex("comments")
        .orderBy("comment_id", "ASC")
        .then(actual => {
          /* eslint-disable max-len */
          let expected = [
            {
              comment_id: 1,
              user_id: 1,
              picture_id: 1,
              comment: "this place is awesome"
            }
          ];

          /* eslint-enable max-len */

          for (let i = 0; i < expected.length; i++) {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
          }

          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test("ratings rows", done => {
      knex("ratings")
        .orderBy("rating_id", "ASC")
        .then(actual => {
          /* eslint-disable max-len */
          let expected = [
            {
              rating_id: 1,
              user_id: 1,
              picture_id: 1,
              rating: 5
            }
          ];

          /* eslint-enable max-len */

          for (let i = 0; i < expected.length; i++) {
            assert.deepEqual(actual[i], expected[i], `Row id=${i + 1} not the same`);
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
