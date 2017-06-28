"use strict";

const express = require("express");
const knex = require("../knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PictureController = require("../controller/Pictures");

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
  let user_id = req.params.user_id;

  pictureController.getAllUsersFavorites(user_id).then(usersFavorites => {
    if (usersFavorites.length === 0) {
      return res.status(404).send(`User at ${user_id} not found`);
    }
    res.status(200).json(usersFavorites);
  });
});

router.get("/pictures/:user_id/:picture_id", (req, res) => {
  let user_id = req.params.user_id;
  let picture_id = req.params.picture_id;
  let checkForPicture = pictureController.checkIfUserHasFavorite(user_id);
  let specificPicture = pictureController.getPicturesByPictureId(picture_id);

  checkForPicture.then(allPictures => {
    if (!allPictures) {
      return res.status(404).send(`User at ${user_id} not found`);
    } else {
      allPictures.forEach(eachPicture => {
        if (eachPicture.picture_id === picture_id * 1) {
          specificPicture
            .then(result => {
              res.status(200).json(result);
              return;
            })
            .catch(err => {
              console.log("ERROR:", err);
              res.sendStatus(500);
            });
        }
      });
      // res.status(404).send(`Picture at ${picture_id} not found`);
    }
  });
});

router.post("/pictures/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  let pictureObj = req.body;
  let checkUserForPicture = pictureController.checkIfUserHasFavorite(user_id);
  let searchForURL = pictureController.searchForURL(pictureObj);
  let addToPictures = pictureController.addToPictures(pictureObj);

  checkUserForPicture
    .then(result => {
      if (result.length === 0) {
        return res.status(404).send(`User at ${user_id} not found`);
      }
      searchForURL
        .then(result => {
          if (result.length > 0) {
            pictureController.addToFavorites(user_id, result[0].picture_id);
            return res.status(200).json(result);
          } else {
            addToPictures
              .then(result => {
                return res.status(200).json(result);
              })
              .catch(err => {
                console.log("ERROR:", err);
                res.sendStatus(500);
              });
          }
        })
        .catch(err => {
          console.log("ERROR:", err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.delete("/pictures/:user_id/:picture_id", (req, res) => {
  let user_id = req.params.user_id;
  let picture_id = req.params.picture_id;
  let checkUserForPicture = pictureController.checkIfUserHasFavorite(user_id);
  let pathPictureToDelete = pictureController.getPicturesByPictureId(
    picture_id
  );
  let pictureToDelete;
  let deletePictureFromFavorites = pictureController.deletePictureFromFavorites(
    user_id,
    picture_id
  );

  checkUserForPicture.then(result => {
    if (result.length === 0) {
      return res.status(404).send(`User at ${user_id} not found`);
    }
    pathPictureToDelete.then(result => {
      pictureToDelete = result;
    });
    deletePictureFromFavorites.then(result => {
      if (result > 0) {
        return res.status(200).json(pictureToDelete);
      }
      return res.status(404).send(`Picture at ${picture_id} not found`);
    });
  });
});

module.exports = router;
