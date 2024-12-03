import cron from "node-cron";
import {
  updateStandingsInDB,
  updateCurrentMatchdayInDB,
} from "../controllers/football.controller.js";

cron.schedule("0 * * * *", async () => {
  console.log("Running updateStandingsInDB at:", new Date().toISOString());
  try {
    await updateStandingsInDB(
      {
        body: {},
      },
      {
        status: () => ({ json: () => {} }),
      }
    );
  } catch (error) {
    console.error(
      "Scheduled task for updateStandingsInDB failed:",
      error.message
    );
  }
});

cron.schedule("0 * * * *", async () => {
  console.log(
    "Running updateCurrentMatchdayInDB at:",
    new Date().toISOString()
  );
  try {
    await updateCurrentMatchdayInDB(
      {
        body: {},
      },
      {
        status: () => ({ json: () => {} }),
      }
    );
  } catch (error) {
    console.error(
      "Scheduled task for updateCurrentMatchdayInDB failed:",
      error.message
    );
  }
});

console.log("Scheduler is set up");
