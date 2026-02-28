import { movies as watchlist } from "../../data/movies.ts";


const yearCounter = new Map<string, number>();
watchlist
  .map((m) => m.releaseDate.substring(0, 4)).forEach((year) => {
    const n = yearCounter.has(year) ? yearCounter.get(year)! : 0;
    yearCounter.set(year, n + 1);
  });

const formattedData = Array.from(yearCounter, ([key, value]) => ({ year: key, count: value }));

export async function GET() {
    return new Response(JSON.stringify(formattedData));
}
