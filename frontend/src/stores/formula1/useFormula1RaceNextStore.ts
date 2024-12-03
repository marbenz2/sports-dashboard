import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { Formula1RaceType } from "@/types";

interface Formula1RaceNextStore {
  f1NextRace: Formula1RaceType | null;
  isF1NextRaceLoading: boolean;
  getF1NextRace: () => void;
}

export const useFormula1RaceNextStore = create<Formula1RaceNextStore>(
  (set) => ({
    f1NextRace: null,
    isF1NextRaceLoading: false,
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
  })
);
