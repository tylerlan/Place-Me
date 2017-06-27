"use strict";

process.env.NODE_ENV = "test";

const assert = require("chai").assert;
const { suite, test } = require("mocha");
const bcrypt = require("bcrypt");
const request = require("supertest");
const knex = require("../knex");
const server = require("../index");

suite("pictures routes", () => {
  /*=================================
      GET ALL FAVORITES (in the db)
  =================================*/
  test("GET /pictures", done => {
    request(server)
      .get("/pictures")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            picture_id: 1,
            url: "https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg",
            lat: "54.627389",
            lon: "-122.500307"
          },
          {
            picture_id: 2,
            url: "https://farm1.staticflickr.com/2/9998878_4m62283336_l.jpg",
            lat: "44.600389",
            lon: "-122.726307"
          },
          {
            picture_id: 3,
            url: "https://farm1.staticflickr.com/2/1418111_0a92445936_k.jpg",
            lat: "51.627900",
            lon: "-122.444307"
          },
          {
            picture_id: 4,
            url: "https://farm1.staticflickr.com/2/3788878_2f56283336_m.jpg",
            lat: "56.627389",
            lon: "-122.726777"
          }
        ],
        done
      );
  });

  /*=================================
      GET ALL OF USERS' FAVORITES
  =================================*/
  test("GET /pictures/:user_id", done => {
    request(server)
      // GET Ronan's favorites
      .get("/pictures/1")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            picture_id: 1,
            url: "https://farm1.staticflickr.com/2/1418878_1e92283336_m.jpg",
            lat: "54.627389",
            lon: "-122.500307"
          },
          {
            picture_id: 2,
            url: "https://farm1.staticflickr.com/2/9998878_4m62283336_l.jpg",
            lat: "44.600389",
            lon: "-122.726307"
          },
          {
            picture_id: 3,
            url: "https://farm1.staticflickr.com/2/1418111_0a92445936_k.jpg",
            lat: "51.627900",
            lon: "-122.444307"
          }
        ],
        done
      );
  });

  test("GET /pictures/:user_id", done => {
    request(server)
      // GET Tyler's favorites
      .get("/pictures/2")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            picture_id: 2,
            url: "https://farm1.staticflickr.com/2/9998878_4m62283336_l.jpg",
            lat: "44.600389",
            lon: "-122.726307"
          },
          {
            picture_id: 3,
            url: "https://farm1.staticflickr.com/2/1418111_0a92445936_k.jpg",
            lat: "51.627900",
            lon: "-122.444307"
          },
          {
            picture_id: 4,
            url: "https://farm1.staticflickr.com/2/3788878_2f56283336_m.jpg",
            lat: "56.627389",
            lon: "-122.726777"
          }
        ],
        done
      );
  });

  /*=================================
      GET ONE OF USERS' FAVORITES
  =================================*/
  test("GET /pictures/:user_id/:picture_id", done => {
    request(server)
      // GET one of Ronan's favorites
      .get("/pictures/1/2")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(
        200,
        [
          {
            picture_id: 2,
            url: "https://farm1.staticflickr.com/2/9998878_4m62283336_l.jpg",
            lat: "44.600389",
            lon: "-122.726307"
          }
        ],
        done
      );
  });
  /*=================================*/
});
