"use strict";

process.env.NODE_ENV = "test";

const assert = require("chai").assert;
const { suite, test } = require("mocha");
const request = require("supertest");
const server = require("../index");

const expected = "an array of objects, where each object has url, lat, and lon";

suite("search routes", () => {
  test("GET /search?lat&lon", done => {
    let lat = -17.685895;
    let lon = -63.36914;
    request(server)
      .get(`/search?${lat}&${lon}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .expect(200, expected, done);
  });
});
