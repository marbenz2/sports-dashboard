import { Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import FootballPage from "./pages/Football";
import MatchDetailsPage from "./pages/Football/matches/details/[matchId]";
import BiathlonPage from "./pages/Biathlon";
import Formula1Page from "./pages/Formula1";

function App() {
  return (
    <main data-theme="dark" className="flex flex-col gap-24 p-6 min-h-screen">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/football" element={<FootballPage />} />
        <Route
          path="/football/matches/details/:matchId"
          element={<MatchDetailsPage />}
        />
        <Route path="/formula1" element={<Formula1Page />} />
        <Route path="/biathlon" element={<BiathlonPage />} />
      </Routes>
    </main>
  );
}

export default App;
