import { PlayerStat } from ".";
import { findDocument, findDocuments } from "../../infrastructure/mongo";

export async function getPlayerStatByGameAndPlayerId(playerId: string, gameId: number): Promise<PlayerStat | null> {
    const playerStat = await findDocument<PlayerStat>("player-stats", { playerId, gameId });
    return playerStat;
}

export async function getAllPlayerStats(): Promise<PlayerStat[]> {
    const playerStats = await findDocuments<PlayerStat>("player-stats", {});
    return playerStats;
}