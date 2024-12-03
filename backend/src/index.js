import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import footballStandingsRoutes from "./routes/football/standings.route.js";
import footballMatchdayRoutes from "./routes/football/matchday.route.js";
import footballMatchesRoutes from "./routes/football/matches.route.js";
import formulaStandingsRoutes from "./routes/formula1/standings.route.js";
import formulaRacesRoutes from "./routes/formula1/races.route.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/football/standings", footballStandingsRoutes);
app.use("/api/football/matchday", footballMatchdayRoutes);
app.use("/api/football/matches", footballMatchesRoutes);
app.use("/api/formula1/standings", formulaStandingsRoutes);
app.use("/api/formula1/races", formulaRacesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
