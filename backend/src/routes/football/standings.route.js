import express from "express";
import {
  getStandingsFromDB,
  updateStandingsHandler,
} from "../../controllers/football.controller.js";

const router = express.Router();

router.get("/", getStandingsFromDB);

router.post("/update", updateStandingsHandler);

export default router;
