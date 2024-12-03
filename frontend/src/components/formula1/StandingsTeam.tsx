import { Loader } from "lucide-react";
import RefreshButton from "../RefreshButton";
import { useFormula1StandingsTeamStore } from "@/stores/formula1/useFormula1StandingsTeamStore";
import { useEffect } from "react";

export default function StandingsTeam() {
  const { f1StandingsTeam, isF1StandingsTeamLoading, getF1StandingsTeam } =
    useFormula1StandingsTeamStore();

  useEffect(() => {
    getF1StandingsTeam();
  }, [getF1StandingsTeam]);

  if (isF1StandingsTeamLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="badge badge-lg badge-accent">Teamwertung</h2>
        <RefreshButton
          route="/formula1/standings/team/update"
          refresh={getF1StandingsTeam}
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Punkte</th>
          </tr>
        </thead>
        <tbody>
          {f1StandingsTeam?.map((team) => (
            <tr key={team.team.id} className="hover cursor-default">
              <td className="text-accent">{team.position}</td>
              <td className="flex gap-4 items-center">
                <img
                  src={team.team.logo ?? "/images/fallback-avatar.svg"}
                  alt={team.team.name}
                  className="h-8 aspect-auto"
                />
                {team.team.name}
              </td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
