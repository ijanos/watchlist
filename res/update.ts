import omdbkey from "./omdbkey.js";
import { writeFile, readFile } from 'node:fs/promises';
import { type Movie } from "../src/data/movies.ts";


async function getData(imdbid: string): Movie {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${omdbkey}`);
    const movie = await response.json();
    const releaseDate = new Date(movie["Released"] + " UTC").toISOString().split("T")[0];
    return {
        "englishTitle": movie["Title"],
        "director": movie["Director"].split(",").map((d: string) => d.trim()),
        "imdbID": movie["imdbID"],
        "releaseYear": parseInt(movie["Year"]),
        "releaseDate": releaseDate,
        "runtime": parseInt(movie["Runtime"]),
        "watched": `${new Date().toISOString().slice(0, 10)} CHECKME`,
        "ageCertification": movie["Rated"],
        "genres": movie["Genre"].split(",").map((g: string) => g.trim().toLowerCase())
      };
}

const wlistpath = process.argv[2];
const newMovie = getData(process.argv[3]);
const watchlist = readFile(wlistpath, { encoding: "utf-8"});

const w: [Movie] = JSON.parse(await watchlist);

w.push(await newMovie);

w.sort((m1: Movie, m2: Movie) => {
    return m2.releaseDate.localeCompare(m1.releaseDate)
});

await writeFile(wlistpath, JSON.stringify(w, null, 2), { flush: true });
