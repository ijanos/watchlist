import { movies as watchlist } from "../../data/movies.ts";

const runtimes = watchlist.map((m) => ({ runtime: m.runtime }));

export async function GET() {
  return new Response(JSON.stringify(runtimes));
}
