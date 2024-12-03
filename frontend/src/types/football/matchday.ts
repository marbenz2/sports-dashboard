export type Team = {
  teamId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
  teamGroupName: string | null;
};

type Group = {
  groupName: string;
  groupOrderID: number;
  groupID: number;
};

export type Goal = {
  goalID: number;
  scoreTeam1: number;
  scoreTeam2: number;
  matchMinute: number;
  goalGetterID: number;
  goalGetterName: string;
  isPenalty: boolean;
  isOwnGoal: boolean;
  isOvertime: boolean;
  comment: string | null;
};

type MatchResult = {
  resultID: number;
  resultName: string;
  pointsTeam1: number;
  pointsTeam2: number;
  resultOrderID: number;
  resultTypeID: number;
  resultDescription: string;
};

export type MatchType = {
  matchID: number;
  matchDateTime: string;
  timeZoneID: string;
  leagueId: number;
  leagueName: string;
  leagueSeason: number;
  leagueShortcut: string;
  matchDateTimeUTC: string;
  group: Group;
  team1: Team;
  team2: Team;
  lastUpdateDateTime: string;
  matchIsFinished: boolean;
  matchResults: MatchResult[];
  goals: Goal[];
  location: string | null;
  numberOfViewers: number | null;
};

export type MatchdayType = MatchType[];
