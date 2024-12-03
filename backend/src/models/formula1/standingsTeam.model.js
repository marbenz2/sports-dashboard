import mongoose from "mongoose";

const f1TeamSchema = new mongoose.Schema({
  id: { type: Number, required: false, default: null },
  name: { type: String, required: false, default: null },
  logo: { type: String, required: false, default: null },
});

const f1StandingTeamSchema = new mongoose.Schema({
  position: { type: Number, required: true },
  team: { type: f1TeamSchema, required: true },
  points: { type: Number, required: false, default: null },
  season: { type: Number, required: true },
});

const F1StandingsTeam = mongoose.model("F1StandingTeam", f1StandingTeamSchema);

export default F1StandingsTeam;
