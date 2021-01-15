import express from "express";
const router = express.Router();

router.use("/login", require("./login.route"));
router.use("/signup", require("./signup.route"));
router.use("/user", require("./user.route"));

module.exports = router;
