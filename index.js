const express = require("express");
const port = process.env.PORT || 8000;
const app = express();

app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
