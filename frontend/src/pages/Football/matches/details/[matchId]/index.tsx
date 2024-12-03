import BackButton from "@/components/BackButton";
import MatchDetails from "@/components/MatchDetails";
import { useFootballStore } from "@/stores/useFootballStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function MatchDetailsPage() {
  const matchId = useParams().matchId;
  const { chosenMatch, getChosenMatch, isChosenMatchLoading } =
    useFootballStore();

  useEffect(() => {
    getChosenMatch(matchId);
  }, [getChosenMatch, matchId]);

  if (isChosenMatchLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <BackButton />
      <MatchDetails match={chosenMatch} />
    </div>
  );
}
