import { useFootballStandingsStore } from "@/stores/football/useFootballStandingsStore";
import { Loader } from "lucide-react";
import RefreshButton from "../RefreshButton";
import { useEffect } from "react";

export default function Standings() {
  const {
    footballStandings,
    isFootballStandingsLoading,
    getFootballStandings,
  } = useFootballStandingsStore();

  useEffect(() => {
    getFootballStandings();
  }, [getFootballStandings]);

  if (isFootballStandingsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl">
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h2 className="badge badge-lg badge-accent">Tabelle</h2>
        </div>
        <RefreshButton
          route="/football/standings/update"
          refresh={getFootballStandings}
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <td></td>
            <th></th>
            <th>Spiele</th>
            <th>Siege</th>
            <th>Unentschieden</th>
            <th>Niederlagen</th>
            <th>Tore</th>
            <th>Tordifferenz</th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          {footballStandings?.map((team, index) => (
            <tr key={team.teamInfoId} className="hover cursor-default">
              <td className="text-accent">{index + 1}</td>
              <td className="flex gap-4 items-center">
                <img
                  src={team.teamIconUrl}
                  alt={team.teamName}
                  className="size-8 aspect-square"
                />
                {team.teamName}
              </td>
              <td className="text-accent">{team.matches}</td>
              <td>{team.won}</td>
              <td>{team.draw}</td>
              <td>{team.lost}</td>
              <td>
                {team.goals}:{team.opponentGoals}
              </td>
              <td
                className={
                  team.goalDiff > 0
                    ? "text-success"
                    : team.goalDiff < 0
                    ? "text-error"
                    : ""
                }
              >
                {team.goalDiff > 0 && "+"}
                {team.goalDiff}
              </td>
              <td className="font-semibold text-accent">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
