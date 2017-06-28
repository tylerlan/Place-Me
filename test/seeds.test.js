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
              hashed_password: "$2a$12$BgnPH2oUiLRr8rnLmAIOF.wt2GfJoijHb/qbqNLx5fEMsQOzxyHfy"
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
              comment: "I love to code!"
            },
            {
              comment_id: 2,
              user_id: 2,
              picture_id: 4,
              comment: "Javascript is the best!"
            },
            {
              comment_id: 3,
              user_id: 2,
              picture_id: 2,
              comment: "Fullstack for the win."
            },
            {
              comment_id: 4,
              user_id: 1,
              picture_id: 3,
              comment: "Who says we can't do it all?"
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
