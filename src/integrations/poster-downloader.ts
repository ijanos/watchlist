import type { AstroIntegration } from "astro";

import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

import omdbkey from "../../res/omdbkey.js";
import watchlist from "../../src/data/watchlist.json";
import { type Movie } from "../data/movies.ts";

// I'd prefer to have this functionality part of the Poster component
// but Vite/Astro couldn't import the newly created files.

async function downloadPoster(imdbid: string, path: string) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${omdbkey}`);
  const movie = await response.json();
  const posterURL = movie["Poster"];

  if (!posterURL || posterURL == "N/A") { return false; }

  console.log(`Downloading poster for ${imdbid}`);
  const posterResposne = await fetch(posterURL);
  const buffer = Buffer.from(await posterResposne.arrayBuffer());
  await writeFile(path, buffer, { flush: true });
  return true;
}

async function checkPosters(watchlist: Array<Movie>) {
  await Promise.all(watchlist.map(async movie =>  {
    const posterImagePath = `posters/${movie.imdbID}.jpg`;
    if (!existsSync(posterImagePath)) {
      if(!await downloadPoster(movie.imdbID, posterImagePath)) {
          throw new Error(`Couldn't download poster for ${movie.imdbID}`);
      }
    }
  }));
}


export default function posterIntegration(): AstroIntegration {
  return {
    name: "poster-downloader",
    hooks: {
      "astro:config:setup": (_options) => {
        checkPosters(watchlist as Array<Movie>);
      },
    },
  };
}
