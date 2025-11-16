import omdbkey from "./omdbkey.js";
import { writeFile, readFile } from 'node:fs/promises';
import { type Movie } from "../src/data/movies.ts";

async function updateRecord(record: Movie) {
    if (record.country)
    {
      return record;
    }

    const imdbid = record.imdbID;
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${omdbkey}`);
    await new Promise(r => setTimeout(r, 700));
    const movie = await response.json();

    if (movie["Response"] != "True") {
        console.log(movie);
        throw new Error("API error");
    }

    record.language = movie["Language"].split(",").map((d: string) => d.trim());
    record.country = movie["Country"].split(",").map((d: string) => d.trim());

    return record;
}

const wlistpath = process.argv[2];
const watchlist = readFile(wlistpath, { encoding: "utf-8"});

const currentWatchlist: Movie[] = JSON.parse(await watchlist);

const newlist: Movie[] = []

for (const record of currentWatchlist) {
  console.log(record.englishTitle);
  newlist.push(await updateRecord(record));
  await writeFile("updated.json", JSON.stringify(newlist, null, 2), { flush: true });
}
