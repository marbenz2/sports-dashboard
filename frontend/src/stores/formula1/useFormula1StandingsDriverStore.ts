import { create } from "zustand";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { Formula1StandingsDriverType } from "@/types";

interface Formula1StandingsDriverStore {
  f1StandingsDriver: Formula1StandingsDriverType | null;
  isF1StandingsDriverLoading: boolean;
  getF1StandingsDriver: () => void;
}

export const useFormula1StandingsDriverStore =
  create<Formula1StandingsDriverStore>((set) => ({
    f1StandingsDriver: null,
    isF1StandingsDriverLoading: false,
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
  }));
