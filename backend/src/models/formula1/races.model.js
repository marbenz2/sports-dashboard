import mongoose from "mongoose";

const f1LocationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  city: { type: String, required: true },
});

const f1CircuitSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: false, default: null },
});

const f1CompetitionSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: f1LocationSchema, required: true },
});

const f1LapsSchema = new mongoose.Schema({
  current: { type: Number, required: false, default: null },
  total: { type: Number, required: false, default: null },
});

const f1FastestLapDriverSchema = new mongoose.Schema({
  id: { type: Number, required: false, default: null },
});

const f1FastestLapSchema = new mongoose.Schema({
  driver: { type: f1FastestLapDriverSchema, required: false, default: null },
  time: { type: String, required: false, default: null },
});

const f1RaceSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  competition: { type: f1CompetitionSchema, required: true },
  circuit: { type: f1CircuitSchema, required: true },
  season: { type: Number, required: true },
  type: { type: String, required: true },
  laps: { type: f1LapsSchema, required: true },
  fastest_lap: { type: f1FastestLapSchema, required: false, default: null },
  distance: { type: String, required: false, default: null },
  timezone: { type: String, required: true },
  date: { type: String, required: true },
  weather: { type: String, required: false, default: null },
  status: { type: String, required: true },
});

const f1RaceIdSchema = new mongoose.Schema({
  id: { type: Number, required: true },
});

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

const f1PreviousRaceResultSchema = new mongoose.Schema({
  race: { type: f1RaceIdSchema, required: true },
  driver: { type: f1DriverSchema, required: true },
  team: { type: f1TeamSchema, required: true },
  position: { type: Number, required: true },
  time: { type: String, required: false, default: null },
  laps: { type: Number, required: false, default: null },
  grid: { type: String, required: true },
  pits: { type: Number, required: false, default: null },
  gap: { type: String, required: false, default: null },
});

export const F1NextRace = mongoose.model("F1NextRace", f1RaceSchema);

export const F1PreviousRace = mongoose.model("F1PreviousRace", f1RaceSchema);

export const F1PreviousRaceResult = mongoose.model(
  "F1PreviousRaceResult",
  f1PreviousRaceResultSchema
);
