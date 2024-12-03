import BackButton from "@/components/BackButton";
import MatchDetails from "@/components/football/MatchDetails";
import { useFootballMatchStore } from "@/stores/football/useFootballMatchStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function MatchDetailsPage() {
  const matchId = useParams().matchId;
  const {
    footballChosenMatch,
    getFootballChosenMatch,
    isFootballChosenMatchLoading,
  } = useFootballMatchStore();

  useEffect(() => {
    getFootballChosenMatch(matchId);
  }, [getFootballChosenMatch, matchId]);

  if (isFootballChosenMatchLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <BackButton />
      <MatchDetails match={footballChosenMatch} />
    </div>
  );
}
