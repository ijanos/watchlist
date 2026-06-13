import { directorCounts } from '../data/movies.ts';

const directorsArray = Array.from(directorCounts).sort(([, c1], [, c2]) => c2 - c1);

const directors = directorsArray.map(([name, movies]) => {
 return {
  name: name,
  n: movies,
 };
});

export async function GET() {
 return new Response(JSON.stringify(directors));
}
