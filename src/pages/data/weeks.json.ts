import { movies as watchlist } from "../../data/movies.ts";

interface WeekCount {
  year: number;
  week: number;
  count: number;
}

function getWeekCounts(dateStrings: string[]): WeekCount[] {
  const counterMap = new Map<string, WeekCount>();

  dateStrings.forEach((dateStr) => {
    try {
      const { year, week } = getISOWeekData(dateStr);
      const key = `${year}-${week}`;

      const existing = counterMap.get(key) || 0;

      if (existing) {
        existing.count += 1;
      } else {
        counterMap.set(key, { year, week, count: 1 });
      }
    } catch {
      throw new Error("Invalid Date");
    }
  });

  return Array.from(counterMap.values());
}

function getISOWeekData(dateString: string): { year: number; week: number } {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) throw new Error("Invalid Date");

  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const isoYear = date.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const weekNo = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return { year: isoYear, week: weekNo };
}

const results = getWeekCounts(watchlist.filter(m => m.watched).map(m => m.watched!));

export async function GET() {
  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
