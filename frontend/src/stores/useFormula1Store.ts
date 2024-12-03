import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import {
  Formula1PreviousRaceResultsType,
  Formula1RaceResultType,
  Formula1RaceType,
  Formula1StandingsDriverType,
  Formula1StandingsTeamType,
} from "@/types";

interface Formula1Store {
  f1StandingsDriver: Formula1StandingsDriverType | null;
  f1StandingsTeam: Formula1StandingsTeamType | null;
  f1NextRace: Formula1RaceType | null;
  f1PreviousRace: Formula1PreviousRaceResultsType | null;
  f1PreviousRaceResults: Formula1RaceResultType | null;
  isF1StandingsDriverLoading: boolean;
  isF1StandingsTeamLoading: boolean;
  isF1NextRaceLoading: boolean;
  isF1PreviousRaceLoading: boolean;
  getF1StandingsDriver: () => void;
  getF1StandingsTeam: () => void;
  getF1NextRace: () => void;
  getF1PreviousRace: () => void;
}

export const useFormula1Store = create<Formula1Store>((set) => ({
  f1StandingsDriver: null,
  f1StandingsTeam: null,
  f1NextRace: null,
  f1PreviousRace: null,
  f1PreviousRaceResults: null,
  isF1StandingsDriverLoading: false,
  isF1StandingsTeamLoading: false,
  isF1NextRaceLoading: false,
  isF1PreviousRaceLoading: false,
  getF1StandingsDriver: async () => {
    set({ isF1StandingsDriverLoading: true });
    try {
      const { data } = await axiosInstance.get<Formula1StandingsDriverType>(
        "/formula1/standings/driver"
      );
      set({ f1StandingsDriver: data });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : "An error occurred";
      console.error(errorMessage);
    } finally {
      set({ isF1StandingsDriverLoading: false });
    }
  },
  getF1StandingsTeam: async () => {
    set({ isF1StandingsTeamLoading: true });
    try {
      const { data } = await axiosInstance.get<Formula1StandingsTeamType>(
        "/formula1/standings/team"
      );
      set({ f1StandingsTeam: data });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : "An error occurred";
      console.error(errorMessage);
    } finally {
      set({ isF1StandingsTeamLoading: false });
    }
  },
  getF1NextRace: async () => {
    set({ isF1NextRaceLoading: true });
    try {
      const { data } = await axiosInstance.get<Formula1RaceType>(
        "/formula1/races/next"
      );
      set({ f1NextRace: data });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : "An error occurred";
      console.error(errorMessage);
    } finally {
      set({ isF1NextRaceLoading: false });
    }
  },
  getF1PreviousRace: async () => {
    set({ isF1PreviousRaceLoading: true });
    try {
      const { data } = await axiosInstance.get<Formula1PreviousRaceResultsType>(
        "/formula1/races/previous"
      );
      set({ f1PreviousRace: data });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : "An error occurred";
      console.error(errorMessage);
    } finally {
      set({ isF1PreviousRaceLoading: false });
    }
  },
}));
