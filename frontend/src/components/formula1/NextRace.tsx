import { useFormula1RaceNextStore } from "@/stores/formula1/useFormula1RaceNextStore";
import { Loader } from "lucide-react";
import RefreshButton from "../RefreshButton";
import { useEffect } from "react";

export default function NextRace() {
  const { f1NextRace, isF1NextRaceLoading, getF1NextRace } =
    useFormula1RaceNextStore();

  useEffect(() => {
    getF1NextRace();
  }, [getF1NextRace]);

  if (isF1NextRaceLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  const nextRace = f1NextRace ? f1NextRace[0] : null;

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="badge badge-lg badge-accent">Nächstes Rennen</h2>
        <RefreshButton
          route="/formula1/races/next/update"
          refresh={getF1NextRace}
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Zeit</th>
            <th>Location</th>
            <th>Runden</th>
            <th>Distanz</th>
            <th>Nächste Session</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover cursor-default">
            <td>
              {new Date(nextRace?.date ?? "").toLocaleDateString("de-DE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td>
              {nextRace?.circuit.name} -{" "}
              {nextRace?.competition.location.country}
            </td>
            <td>{nextRace?.laps.total}</td>
            <td>{nextRace?.distance}</td>
            <td>{nextRace?.type}</td>
            <td
              className={`${
                nextRace?.status === "Completed" ? "text-success" : "text-error"
              }`}
            >
              {nextRace?.status}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
