import express from "express";
import {
  getStandingsFromDB,
  updateStandingsInDB,
} from "../controllers/football.controller.js";

const router = express.Router();

router.get("/", getStandingsFromDB);

router.post("/update", updateStandingsInDB);

export default router;
