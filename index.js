if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const users = require("./routes/users");
const pictures = require("./routes/pictures");
const comments = require("./routes/comments");

app.use(users);
app.use(pictures);
app.use(comments);

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});

module.exports = app;
