import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { Buffer } from 'node:buffer';

import type { APIRoute } from 'astro';

import watchlist from "../../data/watchlist.json";
import omdbkey from "../../../res/omdbkey.js";

const CACHE_DIR = ".poster-cache";

async function downloadPoster(imdbid: string, path: string) {
  const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${omdbkey}`);
  const movie = await response.json();
  const posterURL = movie["Poster"];

  if (!posterURL || posterURL == "N/A") { return false; }

  const posterResposne = await fetch(posterURL);
  const buffer = Buffer.from(await posterResposne.arrayBuffer());
  await writeFile(path, buffer);
  return true;
}

export const GET: APIRoute = async ({ params, request }) => {
  const imdbid = params.imdbid;
  const path = `${CACHE_DIR}/${imdbid}.jpg`
  let data;
  if (!existsSync(path)) {
    if (await downloadPoster(imdbid, path)) {
      data = await readFile(path);
    } else {
      data = await readFile("res/placeholder.jpg")
    }
  } else {
    data = await readFile(path);
  }

  return new Response(data, {
    headers: { "Content-Type": "image/jpeg" },
  });
}

export function getStaticPaths() {
  return watchlist.map((movie) => ({ params: { imdbid: movie.imdbID } }));
}
