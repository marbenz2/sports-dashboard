import {
  FootballGoal,
  FootballMatchType,
  FootballTeam,
} from "@/types/football/matchday";
import { useEffect, useState } from "react";

function TeamDetails({
  team,
  goals,
}: {
  team: FootballTeam;
  goals: FootballGoal[];
}) {
  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="flex flex-col items-center">
        <img
          src={team.teamIconUrl}
          alt={team.teamName}
          className="size-16 aspect-square"
        />
        <h3 className="card-title">{team.teamName}</h3>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.goalID} className="flex gap-4 items-center w-fit">
            {goal.goalGetterName}{" "}
            <span className="badge badge-primary">{goal.matchMinute}'</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MatchDetails({
  match,
}: {
  match: FootballMatchType | null;
}) {
  const [goalsTeam1, setGoalsTeam1] = useState<FootballGoal[]>([]);
  const [goalsTeam2, setGoalsTeam2] = useState<FootballGoal[]>([]);

  useEffect(() => {
    if (match) {
      const sortedGoals = [...match.goals].sort(
        (a, b) => a.matchMinute - b.matchMinute
      );

      const team1Goals = sortedGoals.filter((goal, index) => {
        const previousGoal = sortedGoals[index - 1];
        const previousScoreTeam1 = previousGoal?.scoreTeam1 ?? 0;

        return goal.scoreTeam1 > previousScoreTeam1;
      });

      const team2Goals = sortedGoals.filter((goal, index) => {
        const previousGoal = sortedGoals[index - 1];
        const previousScoreTeam2 = previousGoal?.scoreTeam2 ?? 0;

        return goal.scoreTeam2 > previousScoreTeam2;
      });

      setGoalsTeam1(team1Goals);
      setGoalsTeam2(team2Goals);
    }
  }, [match]);

  if (!match) {
    return <div>Match not found</div>;
  }

  return (
    <div className="card w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{match.group.groupOrderID}. Spieltag</h2>
        <p>
          {new Date(match.matchDateTime).toLocaleDateString("de-DE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          {new Date(match.matchDateTime).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="flex justify-around py-4 max-w-4xl w-full self-center">
          <TeamDetails team={match.team1} goals={goalsTeam1} />
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">
              {match.matchResults.length > 0
                ? match.matchResults.find(
                    (result) => result.resultName === "Endergebnis"
                  )?.pointsTeam1
                : "-"}
              :
              {match.matchResults.length > 0
                ? match.matchResults.find(
                    (result) => result.resultName === "Endergebnis"
                  )?.pointsTeam2
                : "-"}
            </div>
            <div>
              (
              {match.matchResults.length > 0
                ? match.matchResults.find(
                    (result) => result.resultName === "Halbzeitergebnis"
                  )?.pointsTeam1
                : "-"}
              :
              {match.matchResults.length > 0
                ? match.matchResults.find(
                    (result) => result.resultName === "Halbzeitergebnis"
                  )?.pointsTeam2
                : "-"}
              )
            </div>
          </div>
          <TeamDetails team={match.team2} goals={goalsTeam2} />
        </div>
      </div>
      <div className="card-body items-center">
        {match.matchIsFinished ? (
          <div className="badge badge-success">Spiel beendet</div>
        ) : new Date(match.matchDateTimeUTC).getTime() <=
          new Date().getTime() ? (
          <div className="badge badge-warning animate-pulse">Spiel läuft</div>
        ) : (
          <div className="badge badge-secondary">
            Spiel noch nicht gestartet
          </div>
        )}
        {match.lastUpdateDateTime && (
          <p className="text-sm">
            Letztes Update:{" "}
            {new Date(match.lastUpdateDateTime).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "numeric",
              day: "2-digit",
            })}
            {" - "}
            {new Date(match.lastUpdateDateTime).toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            Uhr
          </p>
        )}
      </div>
    </div>
  );
}
