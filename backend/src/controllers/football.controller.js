import axios from "axios";
import FootballStandings from "../models/football/standings.model.js";
import FootballMatchday from "../models/football/matchday.model.js";

export const getStandingsFromDB = async (req, res) => {
  try {
    const standings = await FootballStandings.find();
    res.status(200).json(standings);
  } catch (error) {
    console.error("Error in getStandingsFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateStandingsInDB = async () => {
  const currentYear = new Date().getFullYear();
  try {
    const apiData = await axios.get(
      `${process.env.FOOTBALL_API_URI}/getbltable/bl1/${currentYear}`
    );
    await FootballStandings.deleteMany();
    await FootballStandings.insertMany(apiData.data);
    console.log("FootballStandings Data updated successfully");
  } catch (error) {
    console.error("Error in updateStandingsInDB: ", error.message);
  }
};

export const updateStandingsHandler = async (req, res) => {
  try {
    await updateStandingsInDB();
    res
      .status(200)
      .json({ message: "FootballStandings Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentMatchdayFromDB = async (req, res) => {
  try {
    const nextMatches = await FootballMatchday.find();
    res.status(200).json(nextMatches);
  } catch (error) {
    console.error("Error in getNextMatchesFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateCurrentMatchdayInDB = async () => {
  try {
    const apiData = await axios.get(
      `${process.env.FOOTBALL_API_URI}/getmatchdata/bl1`
    );
    await FootballMatchday.deleteMany();
    await FootballMatchday.insertMany(apiData.data);
    console.log("Matchday Data updated successfully");
  } catch (error) {
    console.error("Error in updateCurrentMatchdayInDB: ", error.message);
  }
};

export const updateCurrentMatchdayHandler = async (req, res) => {
  try {
    await updateCurrentMatchdayInDB();
    res
      .status(200)
      .json({ message: "FootballMatchday Data updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMatchesFromAPI = async (req, res) => {
  try {
    const matchId = req.params.gameId;
    const apiData = await axios.get(
      `${process.env.FOOTBALL_API_URI}/getmatchdata/${matchId}`
    );
    res.status(200).json(apiData.data);
  } catch (error) {
    console.error("Error in getMatchesFromAPI: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
