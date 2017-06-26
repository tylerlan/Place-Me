"use strict";

process.env.NODE_ENV = "test";

const { suite, test } = require("mocha");
const request = require("supertest");
const knex = require("../knex");
const server = require("../index");

suite("users route", () => {
  test("GET /users/", done => {
    request(server)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        [
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
        ],
        done
      );
  });

  test("GET /users/:user_id", done => {
    request(server)
      .get("/users/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        [
          {
            user_id: 1,
            username: "Ronan",
            hashed_password: "deawbopjjifogzepgksvpocqcwvpskjcxvvrqfscghwmwrhvwhdznfemaapk"
          }
        ],
        done
      );
  });

  test("POST /users/", done => {
    request(server)
      .post("/users/")
      .set("Accept", "application/json")
      .send({
        username: "Angela"
      })
      .expect("Content-Type", /json/)
      .expext(
        200,
        [
          {
            user_id: 3,
            username: "Angela"
          }
        ],
        done
      );
  });

  test("POST /users/", done => {
    request(server)
      .post("/users")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        username: "Cornelius",
        password: "passwordsareformuggles"
      })
      .expect(200, {
        user_id: 4,
        username: "Cornelius"
      })
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        knex("users")
          .where("id", 4)
          .first()
          .then(newUser => {
            let hashedPassword = newUser.hashed_password;

            delete newUser.hashed_password;

            assert.deepEqual(newUser, {
              id: 4,
              username: "Cornelius"
            });

            const passwordsMatch = bcrypt.compareSync(password, hashedPassword);

            assert.isTrue(passwordsMatch, "Passwords do not match");
            done();
          })
          .catch(err => {
            done(err);
          });
      });
  });

  test("PUT /users/:user_id", done => {
    request(server)
      .put("/users/3")
      .set("Accept", "application/json")
      .send({
        username: "Jenkins"
      })
      .expect("Content-Type", /json/)
      .expext(
        200,
        [
          {
            user_id: 3,
            username: "Jenkins"
          }
        ],
        done
      );
  });

  test("DELETE /users/:user_id", done => {
    request(server)
      .del("/users/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expext(
        200,
        [
          {
            user_id: 2,
            username: "Tyler"
          }
        ],
        done
      );
  });
});
