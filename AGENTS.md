Static site generator based on Astro.js that converts src/data/watchlist.json to a website with movie listings and statistics. Deployed to Cloudflare Pages.

## Tech stack

Astro 6, Tailwind CSS v4, TypeScript (strict), Biome (linter/formatter) + ESLint (.astro files), Alpine.js for interactivity, D3/Observable Plot for charts, Tabulator for tables.

## Project structure

```
src/
  components/   # Astro components (stats charts, Poster, Table, Nav, Footer)
  data/         # watchlist.json (source data) + movies.ts (typed, validated, indexed)
  integrations/ # Astro integrations (poster-downloader — Node.js modules allowed here)
  layouts/      # Layout.astro base layout
  pages/        # Routes: index, stats, posters, tabulator, directors, JSON endpoints
  styles/       # global.css (Tailwind imports + component classes)
res/            # Utility scripts (update.ts for adding movies — Node.js modules allowed here)
posters/        # Downloaded movie poster images
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — full pipeline: eslint → biome check → astro check → astro build
- `npm run lint` — biome check on src/ and res/
- `npm run lint:fix` — biome auto-fix
- `npm run format` — biome format
- `npm run addMovie <imdbid>` — interactive script to add a movie to watchlist.json
- `npm run deploy` — build + deploy to Cloudflare Pages

## Rules

- Run `npm run lint` after changes and fix all errors before considering a task done.
- Do not edit watchlist.json unless explicitly asked to do so.
