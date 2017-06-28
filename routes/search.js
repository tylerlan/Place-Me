"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const SearchController = require("../controller/Search");

const router = express.Router();

let searchController = new SearchController();

router.get("/search", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  if (lon === "undefined" || lat === "undefined" || !lon || !lat) {
    return res
      .status(400)
      .set("Content-Type", "text/plain")
      .send("Search requires both lat and lon");
  }
  let pictureData = searchController.getPictureData(lat, lon);

  pictureData
    .then(picArray => {
      return searchController.generateObjects(picArray, lat, lon);
    })
    .then(outputArray => {
      res.status(200).json(outputArray);
      return;
    })
    .catch(err => {
      return res
        .status(500)
        .set("Content-Type", "text/plain")
        .send("API cannot process this request");
    });
});

module.exports = router;
