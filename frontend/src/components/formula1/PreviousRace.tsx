import { useFormula1RacePreviousStore } from "@/stores/formula1/useFormula1RacePreviousStore";
import { Loader } from "lucide-react";
import RefreshButton from "../RefreshButton";
import { useEffect } from "react";

export default function PreviousRace() {
  const { f1PreviousRace, isF1PreviousRaceLoading, getF1PreviousRace } =
    useFormula1RacePreviousStore();

  useEffect(() => {
    getF1PreviousRace();
  }, [getF1PreviousRace]);

  if (isF1PreviousRaceLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }
  const previousRace = f1PreviousRace ? f1PreviousRace.race[0] : null;
  const preveiousRaceResults = f1PreviousRace ? f1PreviousRace.results : null;

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl gap-12">
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between gap-4">
          <h2 className="badge badge-lg badge-accent">Letztes Rennen</h2>
          <RefreshButton
            route="/formula1/races/previous/update"
            refresh={getF1PreviousRace}
          />
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Zeit</th>
              <th>Location</th>
              <th>Runden</th>
              <th>Distanz</th>
              <th>Schnellste Runde</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover cursor-default">
              <td>
                {new Date(previousRace?.date ?? "").toLocaleDateString(
                  "de-DE",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </td>
              <td>
                {previousRace?.circuit.name} -{" "}
                {previousRace?.competition.location.country}
              </td>
              <td>{previousRace?.laps.total}</td>
              <td>{previousRace?.distance}</td>
              <td>{previousRace?.fastest_lap?.time}</td>
              <td
                className={`${
                  previousRace?.status === "Completed"
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {previousRace?.status}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full items-center justify-between gap-4">
          <h2 className="badge badge-lg badge-accent">Ergebnis Top 3</h2>
        </div>
        <table className="table w-full mt-6">
          <thead>
            <tr>
              <th>Position</th>
              <th></th>
              <th>Fahrer</th>
              <th>Team</th>
              <th>Zeit</th>
            </tr>
          </thead>
          <tbody>
            {preveiousRaceResults?.slice(0, 3).map((result) => (
              <tr key={result.driver.id} className="hover cursor-default">
                <td>{result.position}</td>
                <td>
                  <img
                    src={result.driver.image ?? ""}
                    alt={result.driver.name}
                    className="size-8 aspect-square"
                  />
                </td>
                <td>{result.driver.name}</td>
                <td>{result.team.name}</td>
                <td>{result.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
