import { movies as watchlist } from "../data/movies.ts";
import { getImage } from "astro:assets";

const movies = await Promise.all(watchlist.map(async (m) => {
  const posterImageModule: { default: ImageMetadata } = await import(`../../posters/${m.imdbID}.jpg`);
  const posterImage = posterImageModule.default;
  const optimizedImg = await getImage({src: posterImage, width: 65})

  return {
    poster: optimizedImg.src,
    title: m.englishTitle,
    director: m.director,
    release: m.releaseYear,
    watchyear: m.watched ? m.watched.slice(0,4) : m.releaseYear,
  }
}));

export async function GET() {
    return new Response(JSON.stringify(movies));
}
