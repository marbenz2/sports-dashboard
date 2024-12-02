import express from "express";
import {
  getFormula1NextRaceFromDB,
  updateFormula1NextRaceHandler,
  getFormula1PreviousRaceFromDB,
  updateFormula1PreviousRaceHandler,
} from "../../controllers/formula1.controller.js";

const router = express.Router();

router.get("/next", getFormula1NextRaceFromDB);
router.get("/previous", getFormula1PreviousRaceFromDB);

router.post("/next/update", updateFormula1NextRaceHandler);
router.post("/previous/update", updateFormula1PreviousRaceHandler);

export default router;
