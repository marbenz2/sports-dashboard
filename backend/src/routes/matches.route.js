import express from "express";
import { getMatchesFromAPI } from "../controllers/football.controller.js";

const router = express.Router();

router.get("/:gameId", getMatchesFromAPI);

export default router;
