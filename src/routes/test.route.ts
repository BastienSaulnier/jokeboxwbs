import express from "express";
import { testRoute } from "../controllers/test.controller";

const router = express.Router();

router.get("/", testRoute);

module.exports = router;
