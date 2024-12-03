export type FootballTeam = {
  teamId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
  teamGroupName: string | null;
};

export type FootballGroup = {
  groupName: string;
  groupOrderID: number;
  groupID: number;
};

export type FootballGoal = {
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

export type FootballMatchResult = {
  resultID: number;
  resultName: string;
  pointsTeam1: number;
  pointsTeam2: number;
  resultOrderID: number;
  resultTypeID: number;
  resultDescription: string;
};

export type FootballMatchType = {
  matchID: number;
  matchDateTime: string;
  timeZoneID: string;
  leagueId: number;
  leagueName: string;
  leagueSeason: number;
  leagueShortcut: string;
  matchDateTimeUTC: string;
  group: FootballGroup;
  team1: FootballTeam;
  team2: FootballTeam;
  lastUpdateDateTime: string;
  matchIsFinished: boolean;
  matchResults: FootballMatchResult[];
  goals: FootballGoal[];
  location: string | null;
  numberOfViewers: number | null;
};

export type FootballMatchdayType = FootballMatchType[];
