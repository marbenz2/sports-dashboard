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
  getChosenMatch: (matchId: string | undefined) => void;
}

export const useFootballStore = create<FootballStore>((set) => ({
  standings: null,
  currentMatchday: null,
  chosenMatch: null,
  isStandingsLoading: false,
  isCurrentMatchdayLoading: false,
  isChosenMatchLoading: false,
  getStandings: async () => {
    set({ isStandingsLoading: true });
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
    set({ isCurrentMatchdayLoading: true });
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
  getChosenMatch: async (matchId: string | undefined) => {
    if (!matchId) {
      return;
    }
    set({ isChosenMatchLoading: true });
    try {
      const { data } = await axiosInstance.get<MatchType>(
        `/matches/${matchId}`
      );
      set({ chosenMatch: data });
      console.log("Chosen Match: ", data);
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
