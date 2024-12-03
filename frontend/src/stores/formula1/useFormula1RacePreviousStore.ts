import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import {
  Formula1PreviousRaceResultsType,
  Formula1RaceResultType,
} from "@/types";

interface Formula1RacePreviousStore {
  f1PreviousRace: Formula1PreviousRaceResultsType | null;
  f1PreviousRaceResults: Formula1RaceResultType | null;
  isF1PreviousRaceLoading: boolean;
  getF1PreviousRace: () => void;
}

export const useFormula1RacePreviousStore = create<Formula1RacePreviousStore>(
  (set) => ({
    f1PreviousRace: null,
    f1PreviousRaceResults: null,
    isF1PreviousRaceLoading: false,
    getF1PreviousRace: async () => {
      set({ isF1PreviousRaceLoading: true });
      try {
        const { data } =
          await axiosInstance.get<Formula1PreviousRaceResultsType>(
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
  })
);
