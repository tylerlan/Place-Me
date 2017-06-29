"use strict";

const express = require("express");
const knex = require("../knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const verifyToken = require("./verify-token");

const CommentController = require("../controller/Comments");

const router = express.Router();

let commentController = new CommentController();

router.get("/comments/:user_id", verifyToken, (req, res) => {
  let user_id = req.params.user_id;
  let allUsersComments = commentController.getAllUsersComments(user_id);

  allUsersComments
    .then(usersComments => {
      if (usersComments.length === 0) {
        return res.status(404).send("This user hasn't commented or doesn't exist");
      }
      res.status(200).json(usersComments);
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.get("/comments/:user_id/:picture_id", verifyToken, (req, res) => {
  let user_id = req.params.user_id;
  let picture_id = req.params.picture_id;
  let allUsersComments = commentController.getAllUsersComments(user_id);

  allUsersComments
    .then(usersComments => {
      if (usersComments.length > 0) {
        let total = usersComments.filter(comments => {
          return comments.picture_id === picture_id * 1;
        });
        if (total.length === 1) {
          res.status(200).json(total);
        } else {
          res.status(404).send("Please enter a valid picture id");
          return;
        }
      } else {
        res.status(404).send("Please enter a valid user id");
        return;
      }
    })
    .catch(err => {
      console.log("ERROR:", err);
      res.sendStatus(500);
    });
});

router.post("/comments/:user_id", verifyToken, (req, res) => {
  let user_id = req.params.user_id;
  let commentObj = req.body;
  commentObj.user_id = user_id;
  let addToComments = commentController.addToComments(commentObj);
  let checkForPicture = commentController.checkForPicture(commentObj.picture_id);
  let checkForUser = commentController.checkForUser(user_id);

  checkForUser
    .then(result => {
      if (result.length === 0) {
        res.status(404).send("User not found");
        return;
      }
      checkForPicture
        .then(pictureExists => {
          if (pictureExists.length === 0) {
            res.status(404).send("Please enter a valid picture id");
            return;
          } else {
            addToComments
              .then(result => {
                res.status(200).json(result);
                return;
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

router.delete("/comments/:user_id/:picture_id", verifyToken, (req, res) => {
  let user_id = req.params.user_id;
  let picture_id = req.params.picture_id;
  let commentToDelete = commentController.getCommentByIds(user_id, picture_id);
  let checkForPicture = commentController.checkForPicture(picture_id);
  let checkForUser = commentController.checkForUser(user_id);

  checkForUser.then(user => {
    if (user.length === 0) {
      res.status(404).send("User not found");
      return;
    } else {
      checkForPicture.then(picture => {
        if (picture.length === 0) {
          res.status(404).send("Picture not found");
          return;
        } else {
          commentToDelete.then(comment => {
            if (comment.length === 0) {
              res.status(404).send("Comment not found");
              return;
            } else {
              commentController.deleteComment(user_id, picture_id).then(result => {
                res.status(200).json(comment);
                return;
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
