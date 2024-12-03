import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { FootballStandingsType } from "@/types";

interface FootballStandingsStore {
  footballStandings: FootballStandingsType | null;
  isFootballStandingsLoading: boolean;
  getFootballStandings: () => void;
}

export const useFootballStandingsStore = create<FootballStandingsStore>(
  (set) => ({
    footballStandings: null,
    isFootballStandingsLoading: false,
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
  })
);
