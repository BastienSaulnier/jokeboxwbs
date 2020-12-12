import logger from "morgan";
import cors from "cors";

const indexRouter = require("./routes/index");
const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

app.use(logger("dev"));
app.use("/", indexRouter);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://preprod.dashboard.unsold.fr"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
    // enablePreflight: true
  })
);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is now listening on port: *[${port}]*`);
});
