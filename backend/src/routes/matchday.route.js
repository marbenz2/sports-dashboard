import express from "express";
import {
  getCurrentMatchdayFromDB,
  updateCurrentMatchdayHandler,
} from "../controllers/football.controller.js";

const router = express.Router();

router.get("/", getCurrentMatchdayFromDB);

router.post("/update", updateCurrentMatchdayHandler);

export default router;
