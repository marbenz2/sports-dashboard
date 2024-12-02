import mongoose from "mongoose";

const footballStandingsSchema = new mongoose.Schema({
  teamInfoId: { type: Number, required: true },
  teamName: { type: String, required: true },
  shortName: { type: String, required: true },
  teamIconUrl: { type: String, required: true },
  points: { type: Number, required: true },
  opponentGoals: { type: Number, required: true },
  goals: { type: Number, required: true },
  matches: { type: Number, required: true },
  won: { type: Number, required: true },
  lost: { type: Number, required: true },
  draw: { type: Number, required: true },
  goalDiff: { type: Number, required: true },
});

const FootballStandings = mongoose.model(
  "FootballStandings",
  footballStandingsSchema
);

export default FootballStandings;
