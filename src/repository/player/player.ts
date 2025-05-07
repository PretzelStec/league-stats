import { cache } from "@/infrastructure/cache";
import { Player } from ".";
import { findDocuments, findDocument } from "../../infrastructure/mongo";

export async function getPlayerById(playerId: string): Promise<Player | null> {
    const player = await findDocument<Player>("players", { playerId });
    return player;
}

export async function getAllPlayers(): Promise<Player[]> {
    if (cache.has("players")) {
        return cache.get("players") as Player[];
    }
    // track performance of fetch
    const start = performance.now();
    const players = await findDocuments<Player>("players", {});
    const end = performance.now();
    console.log(`Fetched players in ${end - start}ms`);
    cache.set("players", players);
    return players;
}