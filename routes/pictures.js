"use strict";

const express = require("express");
const knex = require("../knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PictureController = require("../model/Pictures");

const router = express.Router();

let pictureController = new PictureController();

router.get("/pictures", (req, res) => {
  let allPictures = pictureController.getAllPictures();

  allPictures
    .then(multiPicturesData => {
      res.status(200).json(multiPicturesData);
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.get("/pictures/:user_id", (req, res) => {
  let searchedId = req.params.user_id;
  let userFavoritePictures = pictureController.getPicturesByUserId(searchedId);

  userFavoritePictures
    .then(result => {
      if (!result) {
        return res.status(404).send(`User at ${searchedId} not found`);
      }
      return res.status(200).json(result);
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.get("/pictures/:user_id/:picture_id", (req, res) => {
  let user_id = req.params.user_id;
  let picture_id = req.params.picture_id;
  let checkForPicture = pictureController.checkIfUserHasFavorite(user_id);
  let specificPicture = pictureController.getPicturesByPictureId(picture_id);

  checkForPicture.then(eachPicture => {
    if (!eachPicture) {
      return res.status(404).send(`User at ${searchedId} not found`);
    } else {
      eachPicture.forEach(eachPicture => {
        if (eachPicture.picture_id === picture_id) {
          specificPicture
            .then(result => {
              res.status(200).json(result);
            })
            .catch(err => {
              console.log("ERROR:", err);
              res.sendStatus(500);
            });
        }
      });
    }
  });
});

router.post("/pictures/:user_id/:picture_id", (req, res) => {});

router.delete("/pictures/:user_id/:picture_id", (req, res) => {});

module.exports = router;
