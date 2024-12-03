export type StandingsType = {
  teamInfoId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
  points: number;
  opponentGoals: number;
  goals: number;
  matches: number;
  won: number;
  lost: number;
  draw: number;
  goalDiff: number;
}[];
