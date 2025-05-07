import { Player } from ".";
import { findDocuments, findDocument } from "../../infrastructure/mongo";

export async function getPlayerById(playerId: string): Promise<Player | null> {
    const player = await findDocument<Player>("players", { playerId });
    return player;
}

export async function getAllPlayers(): Promise<Player[]> {
    const players = await findDocuments<Player>("players", {});
    return players;
}