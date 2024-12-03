type Formula1Team = {
  id: number;
  name: string;
  logo: string;
};

export type Formula1StandingsTeamType = {
  position: number;
  team: Formula1Team;
  points: number;
  season: number;
}[];
