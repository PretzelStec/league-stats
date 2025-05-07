import { cache } from "@/infrastructure/cache";
import { PlayerStat } from ".";
import { findDocument, findDocuments } from "../../infrastructure/mongo";

export async function getPlayerStatByGameAndPlayerId(playerId: string, gameId: number): Promise<PlayerStat | null> {
    const playerStat = await findDocument<PlayerStat>("player-stats", { playerId, gameId });
    return playerStat;
}

export async function getAllPlayerStats(): Promise<PlayerStat[]> {
    if (cache.has("player-stats")) {
        return cache.get("player-stats") as PlayerStat[];
    }
    // track performance of fetch
    const start = performance.now();
    const playerStats = await findDocuments<PlayerStat>("player-stats", {});
    const end = performance.now();
    console.log(`Fetched player stats in ${end - start}ms`);
    cache.set("player-stats", playerStats);
    return playerStats;
}