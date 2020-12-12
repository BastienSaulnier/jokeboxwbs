import express from "express";
import {
  testRoute /* testSecondRoute */,
} from "../controllers/test.controller";

const router = express.Router();

router.get("/route", testRoute);
/* router.get("/second", testSecondRoute); */

module.exports = router;
