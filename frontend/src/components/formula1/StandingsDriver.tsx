import { Loader } from "lucide-react";
import RefreshButton from "../RefreshButton";
import { useFormula1StandingsDriverStore } from "@/stores/formula1/useFormula1StandingsDriverStore";
import { useEffect } from "react";

export default function StandingsDriver() {
  const {
    f1StandingsDriver,
    isF1StandingsDriverLoading,
    getF1StandingsDriver,
  } = useFormula1StandingsDriverStore();

  useEffect(() => {
    getF1StandingsDriver();
  }, [getF1StandingsDriver]);

  if (isF1StandingsDriverLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="badge badge-lg badge-accent">Fahrerwertung</h2>
        <RefreshButton
          route="/formula1/standings/driver/update"
          refresh={getF1StandingsDriver}
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Siege</th>
            <th>Punkte</th>
            <th>Rückstand</th>
          </tr>
        </thead>
        <tbody>
          {f1StandingsDriver?.map((driver) => (
            <tr key={driver.driver.id} className="hover cursor-default">
              <td className="text-accent">{driver.position}</td>
              <td className="flex gap-4 items-center">
                <img
                  src={driver.driver.image ?? "/images/fallback-avatar.svg"}
                  alt={driver.driver.name}
                  className="h-8 aspect-auto"
                />
                {driver.driver.name}
              </td>
              <td>
                <div className="flex gap-2 items-center">
                  {driver.team.name ?? "-"}
                </div>
              </td>
              <td className="text-accent">{driver.wins}</td>
              <td>{driver.points > 0 ? driver.points : "0"}</td>
              <td
                className={`font-semibold ${
                  driver.behind > 0 ? "text-error" : ""
                }`}
              >
                {driver.behind ? driver.behind : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
