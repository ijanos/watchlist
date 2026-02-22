import { movies as watchlist } from "../../data/movies.ts";

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const dayCounter = {
  "Monday": 0,
  "Tuesday": 0,
  "Wednesday": 0,
  "Thursday": 0,
  "Friday": 0,
  "Saturday": 0,
  "Sunday": 0,
};


watchlist
  .filter((m) => m.watched)
  .map((m) => m.watched)
  .forEach((watchdate) => {
    const dayIndex = new Date(watchdate!).getDay();
    const day = dayNames[dayIndex];
    const n = dayCounter[day];
    dayCounter[day] = n + 1;
  });

const formattedData = Object.entries(dayCounter).map(([day, count]) => ({
    day,
    count
}));

export async function GET() {
    return new Response(JSON.stringify(formattedData));
}
