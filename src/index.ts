import logger from "morgan";
import cors from "cors";

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is now listening on port: *[${port}]*`);
});
