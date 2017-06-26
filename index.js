"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());

// CSRF protection
app.use((req, res, next) => {
  if (/json/.test(req.get("Accept"))) {
    return next();
  }

  res.sendStatus(406);
});

const users = require("./routes/users");
app.use(users);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});

module.exports = app;
