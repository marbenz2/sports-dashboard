import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { FootballStandingsType } from "@/types";
import { FootballMatchdayType, FootballMatchType } from "@/types";

interface FootballStore {
  footballStandings: FootballStandingsType | null;
  footballCurrentMatchday: FootballMatchdayType | null;
  footballChosenMatch: FootballMatchType | null;
  isFootballStandingsLoading: boolean;
  isFootballCurrentMatchdayLoading: boolean;
  isFootballChosenMatchLoading: boolean;
  getFootballStandings: () => void;
  getFootballCurrentMatchday: () => void;
  getFootballChosenMatch: (matchId: string | undefined) => void;
}

export const useFootballStore = create<FootballStore>((set) => ({
  footballStandings: null,
  footballCurrentMatchday: null,
  footballChosenMatch: null,
  isFootballStandingsLoading: false,
  isFootballCurrentMatchdayLoading: false,
  isFootballChosenMatchLoading: false,
  getFootballStandings: async () => {
    set({ isFootballStandingsLoading: true });
    try {
      const { data } = await axiosInstance.get<FootballStandingsType>(
        "/football/standings"
      );
      set({ footballStandings: data });
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
      set({ isFootballStandingsLoading: false });
    }
  },
  getFootballCurrentMatchday: async () => {
    set({ isFootballCurrentMatchdayLoading: true });
    try {
      const { data } = await axiosInstance.get<FootballMatchdayType>(
        "/football/matchday"
      );
      set({ footballCurrentMatchday: data });
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
      set({ isFootballCurrentMatchdayLoading: false });
    }
  },
  getFootballChosenMatch: async (matchId: string | undefined) => {
    if (!matchId) {
      return;
    }
    set({ isFootballChosenMatchLoading: true });
    try {
      const { data } = await axiosInstance.get<FootballMatchType>(
        `/football/matches/${matchId}`
      );
      set({ footballChosenMatch: data });
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
      set({ isFootballChosenMatchLoading: false });
    }
  },
}));
