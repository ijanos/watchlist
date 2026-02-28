import { movies as watchlist } from "../../data/movies.ts";


const watchYearCounter = new Map<string, number>();
watchlist
  .filter((m) => m.watched)
  .map((m) => m.watched!.substring(0, 4)).forEach((year) => {
    const n = watchYearCounter.has(year) ? watchYearCounter.get(year)! : 0;
    watchYearCounter.set(year, n + 1);
  });

const formattedData = Array.from(watchYearCounter, ([key, value]) => ({ year: key, count: value }));

export async function GET() {
    return new Response(JSON.stringify(formattedData));
}
