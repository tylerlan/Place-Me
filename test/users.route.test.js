"use strict";

process.env.NODE_ENV = "test";

const { suite, test } = require("mocha");
const request = require("supertest");
const knex = require("../knex");
const server = require("../index");

suite("users route", () => {
  test("GET /users", done => {
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

  test("POST /users/:user_id", done => {
    request(server)
      .put("/users/3")
      .set("Accept", "application/json")
      .send({
        username: "Angela",
        hashed_password: "zwvehnnlzbwalucidzmbwaqyeamvjiffhdrxqezhrzmbmpacpjwqpajerdqk"
      })
      .expect("Content-Type", /json/)
      .expext(
        200,
        [
          {
            user_id: 3,
            username: "Angela",
            hashed_password: "zwvehnnlzbwalucidzmbwaqyeamvjiffhdrxqezhrzmbmpacpjwqpajerdqk"
          }
        ],
        done
      );
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
            username: "Jenkins",
            hashed_password: "zwvehnnlzbwalucidzmbwaqyeamvjiffhdrxqezhrzmbmpacpjwqpajerdqk"
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
            username: "Tyler",
            hashed_password: "jqpzovmzzryiopemglqgusdihbexftypqdkridddpfdhzdprkbxioxapoyju"
          }
        ],
        done
      );
  });
});
