const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is now listening on port: *[${port}]*`);
});
