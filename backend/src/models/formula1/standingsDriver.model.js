import mongoose from "mongoose";

const f1DriverSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  abbr: { type: String, required: false, default: null },
  number: { type: Number, required: false, default: null },
  image: { type: String, required: false, default: null },
});

const f1TeamSchema = new mongoose.Schema({
  id: { type: Number, required: false, default: null },
  name: { type: String, required: false, default: null },
  logo: { type: String, required: false, default: null },
});

const f1StandingDriverSchema = new mongoose.Schema({
  position: { type: Number, required: true },
  driver: { type: f1DriverSchema, required: true },
  team: { type: f1TeamSchema, required: true },
  points: { type: Number, required: false, default: null },
  wins: { type: Number, required: true },
  behind: { type: Number, required: false, default: null },
  season: { type: Number, required: true },
});

const F1StandingsDriver = mongoose.model(
  "F1StandingDriver",
  f1StandingDriverSchema
);

export default F1StandingsDriver;
