"use strict";

process.env.NODE_ENV = "test";

const assert = require("chai").assert;
const { suite, test } = require("mocha");
const bcrypt = require("bcrypt");
const request = require("supertest");
const knex = require("../knex");
const server = require("../index");

suite("comments routes", () => {
  /*=================================
      GET ALL OF USERS' COMMENTS
  =================================*/
  test("GET /comments/:user_id", done => {
    request(server)
      // GET Ronan's comments
      .get("/comments/1")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            comment_id: 1,
            user_id: 1,
            picture_id: 1,
            comment: "I love to code!"
          },
          {
            comment_id: 4,
            user_id: 1,
            picture_id: 3,
            comment: "Who says we can't do it all?"
          }
        ],
        done
      );
  });

  test("GET /comments/:user_id", done => {
    request(server)
      // GET Tyler's comments
      .get("/comments/2")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
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
          }
        ],
        done
      );
  });

  test("GET /comments/:user_id 'where nothing comes back'", done => {
    request(server)
      .get("/comments/20")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "This user hasn't commented or doesn't exist", done);
  });

  /*=================================
      GET ONE OF USERS' COMMENTS
  =================================*/
  test("GET /comments/:user_id/:picture_id", done => {
    request(server)
      // GET one of Ronan's comments
      .get("/comments/2/2")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            comment_id: 3,
            user_id: 2,
            picture_id: 2,
            comment: "Fullstack for the win."
          }
        ],
        done
      );
  });

  test("GET /comments/:user_id/:picture_id 'where picture is NOT already in the pictures database'", done => {
    request(server)
      .get("/comments/2/20")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "Please enter a valid picture id", done);
  });

  test("GET /comments/:user_id/:picture_id 'where user is NOT already in the users database'", done => {
    request(server)
      .get("/comments/20/2")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "Please enter a valid user id", done);
  });

  /*=================================
        POST A USERS' COMMENT
  =================================*/

  test("POST /comments/:user_id 'where picture is already in the pictures database'", done => {
    request(server)
      .post("/comments/1")
      .set("Accept", "application/json")
      .send({
        picture_id: 4,
        comment: "OMG! Best picture ever!"
      })
      // Behind the scenes, {user_id: 1, picture_id: 4} should be added to comments table
      .expect("Content-Type", /json/)
      .expect(200, [
        {
          user_id: 1,
          picture_id: 4,
          comment: "OMG! Best picture ever!"
        }
      ]) // BELOW, CHECK DATABASE TO MAKE SURE THAT {user_id: 1, picture_id: 4} WAS ADDED TO COMMENTS. THE OBJECT SHOULD HAVE THE PROPERTY comment_id: 5
      .end((httpErr, res) => {
        if (httpErr) {
          return done(httpErr);
        }
        knex("comments")
          .where({ user_id: 1, picture_id: 4 })
          .first()
          .then(comment => {
            assert.deepEqual(comment, {
              comment_id: 5,
              user_id: 1,
              picture_id: 4,
              comment: "OMG! Best picture ever!"
            });
            done();
          })
          .catch(dbErr => {
            done(dbErr);
          });
      });
  });

  test("POST /comments/:user_id 'where picture is NOT already in the pictures database'", done => {
    request(server)
      .post("/comments/1")
      .set("Accept", "application/json")
      .send({
        picture_id: 10,
        comment: "Worst. Picture. Ever."
      })
      .expect(404, "Please enter a valid picture id", done);
  });

  test("POST /comments/:user_id 'where user is NOT already in the users database'", done => {
    request(server)
      .post("/comments/10")
      .set("Accept", "application/json")
      .send({
        picture_id: 4,
        comment: "OMG! Best picture ever!"
      })
      .expect(404, "User not found", done);
  });

  /*=================================
        DELETE A USERS' COMMENT
  =================================*/
  test("DELETE /comments/:user_id/:picture_id", done => {
    request(server)
      // DELETE one of Ronan's comments (where picture_id: 3)
      .del("/comments/1/4")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(200, [
        {
          comment_id: 5,
          user_id: 1,
          picture_id: 4,
          comment: "OMG! Best picture ever!"
        }
      ])
      // BELOW, CHECK DATABASE TO MAKE SURE THAT comment_id: 4 WAS DELETED
      .end((httpErr, res) => {
        if (httpErr) {
          return done(httpErr);
        }
        knex("comments")
          .where({ user_id: 1, picture_id: 4 })
          .first()
          .then(comment => {
            assert.isUndefined(comment);
            done();
          })
          .catch(dbErr => {
            done(dbErr);
          });
      });
  });

  test("DELETE /comments/:user_id/:picture_id 'where user is NOT already in the users database'", done => {
    request(server)
      .del("/comments/10/4")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "User not found", done);
  });

  test("DELETE /comments/:user_id/:picture_id 'where picture is NOT already in the picture database'", done => {
    request(server)
      .del("/comments/1/40")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "Picture not found", done);
  });

  test("DELETE /comments/:user_id/:picture_id 'where comment is NOT already in the comments database'", done => {
    request(server)
      .del("/comments/2/3")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(404, "Comment not found", done);
  });
});
