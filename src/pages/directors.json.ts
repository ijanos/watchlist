import { movies as watchlist } from "../data/movies.ts";

const directorCounter = new Map<string, number>();
watchlist
  .map((m) => m.director)
  .flat()
  .forEach((d) => {
    const n = directorCounter.has(d) ? directorCounter.get(d)! : 0;
    directorCounter.set(d, n + 1);
  });

const directorsArray = Array.from(directorCounter).sort(
  ([, c1], [, c2]) => c2 - c1
);

const directors = directorsArray.map(([name, movies]) => {
  return {
    name: name,
    n: movies
  }
});

export async function GET() {
    return new Response(JSON.stringify(directors));
}
