"use strict";

const bcrypt = require("bcrypt-as-promised");
const boom = require("boom");
const express = require("express");
const jwt = require("jsonwebtoken");
const knex = require("../knex");

const router = express.Router();

router.get("/users", (req, res, next) => {
  knex("users")
    .then(usersData => {
      res.send(usersData);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/users/:user_id", (req, res, next) => {
  const user_id = Number.parseInt(req.params.user_id);

  if (Number.isNaN(user_id)) {
    return next();
  }

  knex("users")
    .where("user_id", user_id)
    .first()
    .then(userData => {
      if (!userData) {
        throw boom.create(404, "Not Found");
      }
      res.send(userData);
    })
    .catch(err => {
      next(err);
    });
});

router.post("/users", (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(boom.create(400, "Username required"));
  }

  if (!password) {
    return next(boom.create(400, "Password required"));
  }

  knex("users")
    .where("username", username)
    .first()
    .then(userData => {
      if (userData) {
        throw boom.create(400, "Username already exists");
      }

      return bcrypt.hash(password, 12);
    })
    .then(hashedPassword => {
      const newUser = { username, hashed_password };

      return knex("users").insert(newUser, "*");
    })
    .then(newUserData => {
      const payLoad = {
        user_id: newUserData.user_id,
        username: newUserData.username,
        hashed_password: newUserData.hashed_password
      };

      const token = jwt.sign(payLoad, process.env.JWT_KEY, {
        expiresIn: "10 days"
      });

      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
      });

      // delete user.hashedPassword;

      res.send(user);
    })
    .catch(err => {
      next(err);
    });
});

router.put("/users/:user_id", (req, res, next) => {
  const userId = Number.parseInt(req.params.user_id);

  if (Number.isNaN(userId)) {
    return next();
  }

  knex("users")
    .where("user_id", userId)
    .first()
    .then(userToBeUpdated => {
      if (!userToBeUpdated) {
        throw boom.create(404, "Not Found");
      }

      const { username } = req.body; // should users be able to update their password?
      const updatesForUser = {};

      if (username) {
        updateBook.username = username;
      }

      return knex("users").update(updatesForUser, "*").where("user_id", userId);
    })
    .then(data => {
      const updatedUser = data[0];

      res.send(updatedUser);
    })
    .catch(err => {
      next(err);
    });
});

router.delete("/users/:user_id", (req, res, next) => {
  const userId = Number.parseInt(req.params.user_id);

  if (Number.isNaN(userId)) {
    return next();
  }

  let userToBeDeleted;

  knex("users")
    .where("user_id", userId)
    .first()
    .then(userData => {
      if (!userData) {
        throw boom.create(404, "Not Found");
      }

      userToBeDeleted = userData;

      return knex("users").del().where("user_id", userId);
    })
    .then(() => {
      delete userToBeDeleted.userId;

      res.send(userToBeDeleted);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
