import { useEffect } from "react";
import { useFootballStore } from "./stores/useFootballStore";
import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import FootballPage from "./pages/Football";
import MatchDetailsPage from "./pages/Football/matches/details/[matchId]";
import FormulaOnePage from "./pages/FormulaOne";

function App() {
  const { getStandings, getCurrentMatchday } = useFootballStore();

  useEffect(() => {
    getStandings();
    getCurrentMatchday();
  }, [getStandings, getCurrentMatchday]);

  return (
    <main data-theme="dark" className="flex flex-col gap-24 p-6 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/football/" element={<FootballPage />} />
        <Route
          path="/football/matches/details/:matchId"
          element={<MatchDetailsPage />}
        />
        <Route path="/formula-one" element={<FormulaOnePage />} />
      </Routes>
    </main>
  );
}

export default App;
