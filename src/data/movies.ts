import watchlist from "./watchlist.json";

interface Movie {
   englishTitle: string;
   originalTitle?: string;
   watched?: string;
   director: string[];
   imdbID: string;
   releaseYear: number;
   releaseDate: string;
   runtime: number;
   ageCertification: string;
   genres:string[];
}


const compareWatchdate = function (movieA: Movie, movieB: Movie) {
  const movieAdate = movieA["watched"] || movieA["releaseDate"];
  const movieBdate = movieB["watched"] || movieB["releaseDate"];
 return movieAdate.localeCompare(movieBdate);
}

export const movies: Movie[] = watchlist.sort(compareWatchdate).reverse();
