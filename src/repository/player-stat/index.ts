export interface PlayerStat {
    championId: number;
    playerId: string;
    kills: number;
    deaths: number;
    assists: number;
    visionScore: number;
    goldEarned: number;
    damageDealt: number;
    damageTaken: number;
    wardsPlaced: number;
    wardsCleared: number;
    gameDate: Date;
    gameId: number;
    gameDuration: number;
    position: Position;
}

type Position = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

export * from "./player-stat";