import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { Formula1StandingsTeamType } from "@/types";

interface Formula1StandingsTeamStore {
  f1StandingsTeam: Formula1StandingsTeamType | null;
  isF1StandingsTeamLoading: boolean;
  getF1StandingsTeam: () => void;
}

export const useFormula1StandingsTeamStore = create<Formula1StandingsTeamStore>(
  (set) => ({
    f1StandingsTeam: null,
    isF1StandingsTeamLoading: false,
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
  })
);
