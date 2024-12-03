import BackButton from "@/components/BackButton";
import CurrentMatchday from "@/components/football/CurrentMatchday";
import NextMatchday from "@/components/football/NextMatchday";
import Standings from "@/components/football/Standings";

export default function FootballPage() {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <BackButton />
      <Standings />
      <div className="flex flex-col 2xl:flex-row gap-4 w-full justify-between">
        <CurrentMatchday />
        <NextMatchday />
      </div>
    </div>
  );
}
