import BackButton from "@/components/BackButton";
import NextRace from "@/components/formula1/NextRace";
import PreviousRace from "@/components/formula1/PreviousRace";
import StandingsDriver from "@/components/formula1/StandingsDriver";
import StandingsTeam from "@/components/formula1/StandingsTeam";

export default function Formula1Page() {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <BackButton />
      <div className="flex flex-col 2xl:flex-row gap-4 w-full justify-between">
        <StandingsDriver />
        <StandingsTeam />
      </div>
      <div className="flex flex-col 2xl:flex-row gap-4 w-full justify-between">
        <PreviousRace />
        <NextRace />
      </div>
    </div>
  );
}
