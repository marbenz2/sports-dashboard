import axios from "axios";
import Standings from "../models/standings.model.js";
import Matchday from "../models/matchday.model.js";

export const getStandingsFromDB = async (req, res) => {
  try {
    const standings = await Standings.find();
    res.status(200).json(standings);
  } catch (error) {
    console.error("Error in getStandingsFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateStandingsInDB = async (req, res) => {
  try {
    const apiData = await axios.get(
      `${process.env.FOOTBALL_API_URI}/getbltable/bl1/2024`
    );
    await Standings.deleteMany();
    await Standings.insertMany(apiData.data);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error in updateStandingsInDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getCurrentMatchdayFromDB = async (req, res) => {
  try {
    const nextMatches = await Matchday.find();
    res.status(200).json(nextMatches);
  } catch (error) {
    console.error("Error in getNextMatchesFromDB: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateCurrentMatchdayInDB = async (req, res) => {
  try {
    const apiData = await axios.get(
      `${process.env.FOOTBALL_API_URI}/getmatchdata/bl1`
    );
    await Matchday.deleteMany();
    await Matchday.insertMany(apiData.data);
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error in updateCurrentMatchdayInDB: ", error.message);
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
