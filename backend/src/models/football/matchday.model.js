// matchday.model.js
import mongoose from "mongoose";

const footballTeamSchema = new mongoose.Schema({
  teamId: { type: Number, required: true },
  teamName: { type: String, required: true },
  shortName: { type: String, required: true },
  teamIconUrl: { type: String, required: true },
  teamGroupName: { type: String, default: null },
});

const footballGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  groupOrderID: { type: Number, required: true },
  groupID: { type: Number, required: true },
});

const footballGoalSchema = new mongoose.Schema({
  goalID: { type: Number, required: true },
  scoreTeam1: { type: Number, required: true },
  scoreTeam2: { type: Number, required: true },
  matchMinute: { type: Number, required: true },
  goalGetterID: { type: Number, required: true },
  goalGetterName: { type: String, required: true },
  isPenalty: { type: Boolean, required: true },
  isOwnGoal: { type: Boolean, required: true },
  isOvertime: { type: Boolean, required: true },
  comment: { type: String, default: null },
});

const footballMatchResultSchema = new mongoose.Schema({
  resultID: { type: Number, required: true },
  resultName: { type: String, required: true },
  pointsTeam1: { type: Number, required: true },
  pointsTeam2: { type: Number, required: true },
  resultOrderID: { type: Number, required: true },
  resultTypeID: { type: Number, required: true },
  resultDescription: { type: String, required: true },
});

const footballMatchSchema = new mongoose.Schema({
  matchID: { type: Number, required: true },
  matchDateTime: { type: Date, required: true },
  timeZoneID: { type: String, required: true },
  leagueId: { type: Number, required: true },
  leagueName: { type: String, required: true },
  leagueSeason: { type: Number, required: true },
  leagueShortcut: { type: String, required: true },
  matchDateTimeUTC: { type: Date, required: true },
  group: { type: footballGroupSchema, required: true },
  team1: { type: footballTeamSchema, required: true },
  team2: { type: footballTeamSchema, required: true },
  lastUpdateDateTime: { type: Date, required: true },
  matchIsFinished: { type: Boolean, required: true },
  matchResults: { type: [footballMatchResultSchema], required: true },
  goals: { type: [footballGoalSchema], required: true },
  location: { type: String, default: null },
  numberOfViewers: { type: Number, default: null },
});

const FootballMatchday = mongoose.model(
  "CurrentFootballMatch",
  footballMatchSchema
);

export default FootballMatchday;
