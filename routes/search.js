"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const SearchController = require("../controller/Search");

const router = express.Router();

let searchController = new SearchController();

router.get("/search?lat&lon", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;

  let pictureData = searchController.getPictureData(lat, lon);

  pictureData
    .then(arrayOfPictureDataObjects => {
      return res.status(200).json(arrayOfPictureDataObjects);
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
