import watchlist from "../data/watchlist.json";

export async function GET() {
    return new Response(JSON.stringify(watchlist));
}
