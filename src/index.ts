import logger from "morgan";
import cors from "cors";

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const indexRouter = require("./routes/index");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://personaljokebox.netlify.app"],
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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/../static"));
app.use("/", indexRouter);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is now listening on port: *[${port}]*`);
});
