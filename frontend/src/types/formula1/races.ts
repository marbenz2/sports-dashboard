type Location = {
  country: string;
  city: string;
};

type Competition = {
  id: number;
  name: string;
  location: Location;
};

type Circuit = {
  id: number;
  name: string;
  image: string;
};

type Laps = {
  current: number | null;
  total: number;
};

type FastestLapDriver = {
  id: number | null;
};

type FastestLap = {
  driver: FastestLapDriver | null;
  time: string | null;
};

export type Formula1RaceType = {
  id: number;
  competition: Competition;
  circuit: Circuit;
  season: number;
  type: string;
  laps: Laps;
  fastest_lap: FastestLap | null;
  distance: string;
  timezone: string;
  date: string;
  weather: string | null;
  status: string;
}[];

type Formula1Race = {
  id: number;
};

type Driver = {
  id: number;
  name: string;
  abbreviation: string | null;
  number: number | null;
  image: string | null;
};

type Team = {
  id: number | null;
  name: string | null;
  logo: string | null;
};

export type Formula1RaceResultType = {
  race: Formula1Race;
  driver: Driver;
  team: Team;
  position: number;
  time: string | null;
  laps: number | null;
  grid: number;
  pitstops: number | null;
  gap: string | null;
};

export type Formula1PreviousRaceResultsType = {
  race: Formula1RaceType;
  results: Formula1RaceResultType[];
};
