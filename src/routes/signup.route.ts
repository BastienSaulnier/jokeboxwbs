import express from "express";
import { signupController } from "../controllers/signup.controller";

const router = express.Router();

router.post("/", signupController);

module.exports = router;
