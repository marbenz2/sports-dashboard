import BackButton from "@/components/BackButton";
import Matchday from "@/components/football/Matchday";
import Standings from "@/components/football/Standings";

export default function FootballPage() {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <BackButton />
      <div className="flex flex-col 2xl:flex-row gap-4 w-full justify-between">
        <Standings />
        <Matchday />
      </div>
    </div>
  );
}
