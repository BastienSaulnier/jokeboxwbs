import express from "express";
import { getUserByIdController } from "../controllers/user.controller";

const router = express.Router();

router.get("/me", getUserByIdController);

module.exports = router;
