import { RefreshCw } from "lucide-react";
import { axiosInstance, AxiosError } from "@/lib/axios";

export default function RefreshButton({
  route,
  refresh,
}: {
  route: string;
  refresh: () => void;
}) {
  const handleOnClick = async () => {
    try {
      await axiosInstance.post(route);
      console.log("Data successfully refreshed");
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
      refresh();
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className="btn btn-circle items-center justify-center group"
    >
      <RefreshCw className="size-6 aspect-square group-hover:animate-spin-once" />
    </button>
  );
}
