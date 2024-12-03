import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import {
  FootballCurrentMatchdayType,
  FootballNextMatchdayType,
  FootballCominedMatchdayType,
} from "@/types";

interface FootballMatchdayStore {
  footballCurrentMatchday: FootballCurrentMatchdayType | null;
  footballNextMatchday: FootballNextMatchdayType | null;
  isFootballMatchdayLoading: boolean;
  getFootballMatchday: () => void;
}

export const useFootballMatchdayStore = create<FootballMatchdayStore>(
  (set) => ({
    footballCurrentMatchday: null,
    footballNextMatchday: null,
    isFootballMatchdayLoading: false,
    getFootballMatchday: async () => {
      set({ isFootballMatchdayLoading: true });
      try {
        const { data } = await axiosInstance.get<FootballCominedMatchdayType>(
          "/football/matchday"
        );
        set({ footballCurrentMatchday: data.currentMatches });
        set({ footballNextMatchday: data.nextMatches });
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
        set({ isFootballMatchdayLoading: false });
      }
    },
  })
);
