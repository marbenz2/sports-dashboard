import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { StandingsType } from "@/types";
import { MatchdayType, MatchType } from "@/types/football/matchday";

interface FootballStore {
  standings: StandingsType | null;
  currentMatchday: MatchdayType | null;
  chosenMatch: MatchType | null;
  isStandingsLoading: boolean;
  isCurrentMatchdayLoading: boolean;
  isChosenMatchLoading: boolean;
  getStandings: () => void;
  getCurrentMatchday: () => void;
  getChosenMatch: (matchId: number) => void;
}

export const useFootballStore = create<FootballStore>((set) => ({
  standings: null,
  currentMatchday: null,
  chosenMatch: null,
  isStandingsLoading: false,
  isCurrentMatchdayLoading: false,
  isChosenMatchLoading: false,
  getStandings: async () => {
    try {
      const { data } = await axiosInstance.get<StandingsType>("/standings");
      set({ standings: data });
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
      set({ isStandingsLoading: false });
    }
  },
  getCurrentMatchday: async () => {
    try {
      const { data } = await axiosInstance.get<MatchdayType>("/matchday");
      set({ currentMatchday: data });
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
      set({ isCurrentMatchdayLoading: false });
    }
  },
  getChosenMatch: async (matchId: number) => {
    try {
      const { data } = await axiosInstance.get<MatchType>(
        `/matches/${matchId}`
      );
      set({ chosenMatch: data });
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
      set({ isChosenMatchLoading: false });
    }
  },
}));
