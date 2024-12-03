import express from "express";
import {
  getCurrentMatchdayFromDB,
  updateCurrentMatchdayInDB,
} from "../controllers/football.controller.js";

const router = express.Router();

router.get("/", getCurrentMatchdayFromDB);

router.post("/update", updateCurrentMatchdayInDB);

export default router;
