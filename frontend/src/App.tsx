import { useEffect } from "react";
import { useFootballStore } from "./stores/useFootballStore";
import Standings from "./components/Standings";
import { Loader } from "lucide-react";
import Matchday from "./components/Matchday";

function App() {
  const {
    getStandings,
    isStandingsLoading,
    getCurrentMatchday,
    isCurrentMatchdayLoading,
  } = useFootballStore();

  useEffect(() => {
    getStandings();
    getCurrentMatchday();
  }, [getStandings, getCurrentMatchday]);

  if (isStandingsLoading || isCurrentMatchdayLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <main data-theme="dark" className="flex flex-col gap-24 p-6 min-h-screen">
      <div className="flex flex-col 2xl:flex-row gap-24 w-full justify-between">
        <Standings />
        <Matchday />
      </div>
    </main>
  );
}

export default App;
