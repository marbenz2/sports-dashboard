import express from "express";
import {
  getMatchdayFromDB,
  updateMatchdayHandler,
} from "../../controllers/football.controller.js";

const router = express.Router();

router.get("/", getMatchdayFromDB);

router.post("/update", updateMatchdayHandler);

export default router;
