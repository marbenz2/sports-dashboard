import { RefreshCw } from "lucide-react";
import { axiosInstance, AxiosError } from "@/lib/axios";
import { useState } from "react";
import { cn } from "@/lib/utils"; // Utility für className Kombinationen

interface RefreshButtonProps {
  route: string;
  refresh: () => Promise<void> | void;
  className?: string;
}

export default function RefreshButton({
  route,
  refresh,
  className,
}: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post(route);
      await refresh();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data &&
        typeof axiosError.response.data === "object" &&
        "message" in axiosError.response.data
          ? (axiosError.response.data as { message: string }).message
          : "Ein Fehler ist aufgetreten";
      console.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={isLoading}
      className={cn(
        "btn btn-circle items-center justify-center group",
        isLoading && "cursor-not-allowed opacity-50",
        className
      )}
      aria-label="Daten aktualisieren"
    >
      <RefreshCw
        className={cn(
          "size-6 aspect-square",
          isLoading ? "animate-spin" : "group-hover:animate-spin-once"
        )}
      />
    </button>
  );
}
