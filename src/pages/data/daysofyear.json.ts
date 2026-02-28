import { movies as watchlist } from "../../data/movies.ts";

interface DayData {
  month: number;
  day: number;
  count: number;
}

// 1. Create a template for every possible day (MM-DD)
// Using 2000 because it's a leap year (includes Feb 29)
const dayCounter: Record<string, number> = {};
const templateDate = new Date(2000, 0, 1);

while (templateDate.getFullYear() === 2000) {
  const month = String(templateDate.getMonth() + 1).padStart(2, '0');
  const day = String(templateDate.getDate()).padStart(2, '0');
  dayCounter[`${month}-${day}`] = 0;

  templateDate.setDate(templateDate.getDate() + 1);
}

// 2. Aggregate counts from all years
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
