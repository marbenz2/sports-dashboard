import express from "express";
import {
  getFormula1StandingsDriverFromDB,
  updateFormula1StandingsDriverHandler,
  getFormula1StandingsTeamFromDB,
  updateFormula1StandingsTeamHandler,
} from "../../controllers/formula1.controller.js";

const router = express.Router();

router.get("/driver", getFormula1StandingsDriverFromDB);
router.get("/team", getFormula1StandingsTeamFromDB);

router.post("/driver/update", updateFormula1StandingsDriverHandler);
router.post("/team/update", updateFormula1StandingsTeamHandler);

export default router;
