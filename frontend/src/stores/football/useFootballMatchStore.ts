import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { FootballMatchType } from "@/types";

interface FootballMatchStore {
  footballChosenMatch: FootballMatchType | null;
  isFootballChosenMatchLoading: boolean;
  getFootballChosenMatch: (matchId: string | undefined) => void;
}

export const useFootballMatchStore = create<FootballMatchStore>((set) => ({
  footballChosenMatch: null,
  isFootballChosenMatchLoading: false,
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
