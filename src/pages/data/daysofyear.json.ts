import { movies as watchlist } from "../../data/movies.ts";

interface DayData {
  month: number;
  day: number;
  count: number;
}

const dayCounter: Record<string, number> = {};

watchlist
  .filter((m) => m.watched)
  .forEach((m) => {
    const watchDate = new Date(m.watched!);

    // Extract only MM-DD
    const month = String(watchDate.getMonth() + 1).padStart(2, '0');
    const day = String(watchDate.getDate()).padStart(2, '0');
    const dateKey = `${month}-${day}`;

    // Increment the count for that specific calendar day
    if (dayCounter[dateKey] !== undefined) {
      dayCounter[dateKey]++;
    } else {
      dayCounter[dateKey] = 1;
    }
  });

const formattedData: DayData[] = Object.entries(dayCounter)
  .map(([day, count]) => {
    const [m, d] = day.split("-").map(Number);
    return {
      month: m - 1,
      day: d,
      count,
    }
  });

export async function GET() {
  return new Response(JSON.stringify(formattedData), {
    headers: { "Content-Type": "application/json" },
  });
}
