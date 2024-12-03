export type Formula1Driver = {
  id: number;
  name: string;
  abbr: string;
  number: number;
  image: string;
};

export type Formula1Team = {
  id: number;
  name: string;
  logo: string;
};

export type Formula1StandingsDriverType = {
  position: number;
  driver: Formula1Driver;
  team: Formula1Team;
  points: number;
  wins: number;
  behind: number;
  season: number;
}[];
