import axios from "axios";
import F1StandingsDriver from "../models/formula1/standingsDriver.model.js";
import F1StandingsTeam from "../models/formula1/standingsTeam.model.js";
import {
  F1NextRace,
  F1PreviousRace,
  F1PreviousRaceResult,
} from "../models/formula1/races.model.js";

export const getFormula1StandingsDriverFromDB = async (req, res) => {
  try {
    const standings = await F1StandingsDriver.find();
    res.status(200).json(standings);
  } catch (error) {
    console.error("Error in getFormula1StandingsDriverFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateFormula1StandingsDriverInDB = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const apiData = await axios.get(
      `${process.env.FORMULA1_API_URI}/rankings/drivers?season=${currentYear}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FORMULA1_API_KEY,
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
      }
    );
    await F1StandingsDriver.deleteMany();
    await F1StandingsDriver.insertMany(apiData.data.response);
    console.log("Formula1StandingsDriver Data updated successfully");
  } catch (error) {
    console.error(
      "Error in updateFormula1StandingsDriverInDB: ",
      error.message
    );
  }
};

export const updateFormula1StandingsDriverHandler = async (req, res) => {
  console.log("Updating Formula1StandingsDriver Data...");
  try {
    await updateFormula1StandingsDriverInDB();
    res
      .status(200)
      .json({ message: "Formula1StandingsDriver Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormula1StandingsTeamFromDB = async (req, res) => {
  try {
    const standings = await F1StandingsTeam.find();
    res.status(200).json(standings);
  } catch (error) {
    console.error("Error in getFormula1StandingsTeamFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateFormula1StandingsTeamInDB = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const apiData = await axios.get(
      `${process.env.FORMULA1_API_URI}/rankings/teams?season=${currentYear}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FORMULA1_API_KEY,
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
      }
    );
    console.log("APIDATA", apiData.data.response);
    await F1StandingsTeam.deleteMany();
    await F1StandingsTeam.insertMany(apiData.data.response);
    console.log("Formula1StandingsTeam Data updated successfully");
  } catch (error) {
    console.error("Error in updateFormula1StandingsTeamInDB: ", error.message);
  }
};

export const updateFormula1StandingsTeamHandler = async (req, res) => {
  console.log("Updating Formula1StandingsTeam Data...");
  try {
    await updateFormula1StandingsTeamInDB();
    res
      .status(200)
      .json({ message: "Formula1StandingsTeam Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormula1NextRaceFromDB = async (req, res) => {
  try {
    const race = await F1NextRace.find();
    res.status(200).json(race);
  } catch (error) {
    console.error("Error in getFormula1NextRaceFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateFormula1NextRaceInDB = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const apiData = await axios.get(
      `${process.env.FORMULA1_API_URI}/races?season=${currentYear}&next=1`,
      {
        headers: {
          "x-rapidapi-key": process.env.FORMULA1_API_KEY,
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
      }
    );
    await F1NextRace.deleteMany();
    await F1NextRace.insertMany(apiData.data.response);
    console.log("Formula1NextRace Data updated successfully");
  } catch (error) {
    console.error("Error in updateFormula1NextRaceInDB: ", error.message);
  }
};

export const updateFormula1NextRaceHandler = async (req, res) => {
  console.log("Updating Formula1NextRace Data...");
  try {
    await updateFormula1NextRaceInDB();
    res
      .status(200)
      .json({ message: "Formula1NextRace Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormula1PreviousRaceFromDB = async (req, res) => {
  try {
    const race = await F1PreviousRace.find();
    const results = await F1PreviousRaceResult.find();
    res.status(200).json({ race, results });
  } catch (error) {
    console.error("Error in getFormula1PreviousRaceFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateFormula1PreviousRaceInDB = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const apiData = await axios.get(
      `${process.env.FORMULA1_API_URI}/races?season=${currentYear}&last=1`,
      {
        headers: {
          "x-rapidapi-key": process.env.FORMULA1_API_KEY,
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
      }
    );
    await F1PreviousRace.deleteMany();
    await F1PreviousRace.insertMany(apiData.data.response);
    console.log("Formula1PreviousRace Data updated successfully");
  } catch (error) {
    console.error("Error in updateFormula1PreviousRaceInDB: ", error.message);
  }
};

export const updateFormula1PreviousRaceResultsInDB = async () => {
  try {
    const previousRace = await F1PreviousRace.find();
    const raceId = previousRace && previousRace[0].id;
    const apiData = await axios.get(
      `${process.env.FORMULA1_API_URI}/rankings/races?race=${raceId}`,
      {
        headers: {
          "x-rapidapi-key": process.env.FORMULA1_API_KEY,
          "x-rapidapi-host": "v1.formula-1.api-sports.io",
        },
      }
    );
    await F1PreviousRaceResult.deleteMany();
    await F1PreviousRaceResult.insertMany(apiData.data.response);
    console.log("PreviousRaceResults Data updated successfully");
  } catch (error) {
    console.error("Error in getPreviousRaceRaceResults: ", error.message);
  }
};

export const updateFormula1PreviousRaceHandler = async (req, res) => {
  console.log("Updating Formula1PreviousRace Data...");
  try {
    await updateFormula1PreviousRaceInDB();
    await updateFormula1PreviousRaceResultsInDB();
    res
      .status(200)
      .json({ message: "Formula1PreviousRace Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
