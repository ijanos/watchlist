import watchlist from "../data/watchlist.json";
import { getImage } from "astro:assets";

const movies = await Promise.all(watchlist.map(async (m) => {
  const posterImageModule: { default: ImageMetadata } = await import(`../../posters/${m.imdbID}.jpg`);
  const posterImage = posterImageModule.default;
  const optimizedImg = await getImage({src: posterImage, width: 125})

  return {
    poster: optimizedImg.src,
    title: m.englishTitle,
    director: m.director,
    release: m.releaseYear
  }
}));

export async function GET() {
    return new Response(JSON.stringify(movies));
}
