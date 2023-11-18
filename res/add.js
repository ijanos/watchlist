import omdbkey from "./omdbkey.js";


async function getData(imdbid) {
    const response = await fetch(`https://www.omdbapi.com/?i=${imdbid}&apikey=${omdbkey}`);
    const movie = await response.json();
    const releaseDate = new Date(movie["Released"] + " UTC").toISOString().split("T")[0];
    const ret = {
        "englishTitle": movie["Title"],
        "director": movie["Director"].split(",").map((g) => g.trim()),
        "imdbID": movie["imdbID"],
        "releaseYear": parseInt(movie["Year"]),
        "releaseDate": releaseDate,
        "runtime": parseInt(movie["Runtime"]),
        "ageCertification": movie["Rated"],
        "genres": movie["Genre"].split(",").map((g) => g.trim().toLowerCase())
      };
    console.log(JSON.stringify(ret, null, 2));
}

const imdbid = process.argv[2];
await getData(imdbid);
