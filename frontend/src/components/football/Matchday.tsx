import { useFootballStore } from "@/stores/useFootballStore";
import { Loader } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import RefreshButton from "../RefreshButton";

export default function Matchday() {
  const {
    footballCurrentMatchday,
    isFootballCurrentMatchdayLoading,
    getFootballCurrentMatchday,
  } = useFootballStore();
  const navigate = useNavigate();

  const handleRowClick = (matchID: number) => {
    navigate(`/football/matches/details/${matchID}`);
  };

  if (isFootballCurrentMatchdayLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  const matchesByDateAndTime = footballCurrentMatchday?.reduce((acc, match) => {
    const date = new Date(match.matchDateTime).toLocaleDateString("de-DE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const time = new Date(match.matchDateTime).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][time]) {
      acc[date][time] = [];
    }
    acc[date][time].push(match);
    return acc;
  }, {} as Record<string, Record<string, typeof footballCurrentMatchday>>);

  return (
    <div className="overflow-x-auto card w-full p-6 shadow-xl">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="badge badge-lg badge-accent">
          Spieltag{" "}
          {footballCurrentMatchday &&
            footballCurrentMatchday[0].group.groupOrderID}
        </h2>
        <RefreshButton
          route="/football/matchday/update"
          refresh={getFootballCurrentMatchday}
        />
      </div>
      <table className="table w-full">
        {Object.entries(matchesByDateAndTime ?? {}).map(
          ([date, matchesByTime]) => (
            <React.Fragment key={date}>
              <thead>
                <tr>
                  <td>
                    <div className="badge badge-neutral">{date}</div>
                  </td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(matchesByTime).map(([time, matches]) => (
                  <React.Fragment key={time}>
                    <tr>
                      <td>
                        <div className="badge badge-neutral">{time}</div>
                      </td>
                    </tr>
                    {matches.map((match) => (
                      <tr
                        key={match.matchID}
                        className="hover cursor-pointer"
                        onClick={() => handleRowClick(match.matchID)}
                      >
                        <td>{match.team1.teamName}</td>
                        <td>
                          <img
                            src={match.team1.teamIconUrl}
                            alt={match.team1.teamName}
                            className="size-8 aspect-square"
                          />
                        </td>
                        <td>
                          {match.matchResults.length > 0
                            ? match.matchResults.find(
                                (result) => result.resultName === "Endergebnis"
                              )?.pointsTeam1
                            : "-"}
                        </td>
                        <td>:</td>
                        <td>
                          {match.matchResults.length > 0
                            ? match.matchResults.find(
                                (result) => result.resultName === "Endergebnis"
                              )?.pointsTeam2
                            : "-"}
                        </td>
                        <td>
                          <img
                            src={match.team2.teamIconUrl}
                            alt={match.team2.teamName}
                            className="size-8 aspect-square"
                          />
                        </td>
                        <td>{match.team2.teamName}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
    </div>
  );
}
