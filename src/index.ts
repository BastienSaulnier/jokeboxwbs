import { init, autorisation, token } from "./utils/auth";
import logger from "morgan";
import cors from "cors";

const colors = require("colors/safe");
const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const indexRouter = require("./routes/index");
const ORIGIN = process.env.DEV_CORS_ORIGIN_URL;
const PORT = process.env.DEV_BACKEND_PORT;

app.use(
  cors({
    origin: [ORIGIN],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
    ],
    credentials: true,
    // enablePreflight: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => init(req, res, next));
app.use((req, res, next) => autorisation(req, res, next));
app.use((req, res, next) => token(req, res, next));
app.use("/", indexRouter);

app.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(
    "Server is now listening on port: " +
      colors.green("*[ ") +
      PORT +
      colors.green(" ]*")
  );
});
