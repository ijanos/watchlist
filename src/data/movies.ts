import watchlist from "./watchlist.json";

interface Movie {
   englishTitle: string;
   originalTitle?: string;
   watched?: string;
   director: string[];
   imdbID: string;
   index: number;
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

const imdbIDs = watchlist.map(m => m.imdbID);
const imdbIDSet = new Set(imdbIDs);
if (imdbIDs.length != imdbIDSet.size) {
   throw Error("Duplicate imdb ids are found in the watchlist");
}

const indexedWatchlist = watchlist.map((movie, index) =>  ({...movie, index: index}));

export const movies: Movie[] = indexedWatchlist.sort(compareWatchdate).reverse();
