"use server";

import { getAllPlayers, getAllPlayerStats, PlayerStat } from "@/repository";

export default async function Home() {

    const stats = await getAllPlayerStats();
    const players = await getAllPlayers();
    const playerIdToNameAndTagLine = new Map<string, { displayName: string; tagLine: string }>();
    players.forEach((player) => {
        playerIdToNameAndTagLine.set(player.playerId, {
            displayName: player.displayName,
            tagLine: player.tagLine,
        });
    });

    const matchesByPlayerArray = stats.reduce((acc, stat) => {
        const playerId = stat.playerId;
        if (!acc[playerId]) {
            acc[playerId] = [];
        }
        acc[playerId].push(stat);
        return acc;
    }, {} as Record<string, PlayerStat[]>);

    const matchesByPositionArray = stats.reduce((acc, stat) => {
        const position = stat.position;
        if (!acc[position]) {
            acc[position] = [];
        }
        acc[position].push(stat);
        return acc;
    }, {} as Record<string, PlayerStat[]>);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="grid gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-[36px]">League of Legends Customs Stats</h1>
                <h2 className="text-[36px]">By Player</h2>
                <MatchesByPlayers matchesByPlayerArray={matchesByPlayerArray} playerIdToNameAndTagLine={playerIdToNameAndTagLine} />
                <h2 className="text-[36px]">By Position</h2>
                <MatchesByPosition matchesByPositionArray={matchesByPositionArray} playerIdToNameAndTagLine={playerIdToNameAndTagLine} />
            </main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
		</div>
	);
}

function MatchesByPlayers({ matchesByPlayerArray, playerIdToNameAndTagLine }: { matchesByPlayerArray: Record<string, PlayerStat[]>; playerIdToNameAndTagLine: Map<string, { displayName: string; tagLine: string }>; }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            { Object.keys(matchesByPlayerArray).map((player: string) => (
                <div key={player} className="flex flex-col gap-[8px] bg-amber-950 p-4">
                    <h2 className="text-[24px] font-bold">{playerIdToNameAndTagLine.get(player)?.displayName}</h2>
                    {
                        matchesByPlayerArray[player].map((stat) => (
                            <div className="flex bg-[#0a0a0a] rounded-xl p-[6px] pr-[10px] pl-[10px] flex-row gap-[20px] justify-between" key={stat.playerId + stat.gameId}>
                                <p className="text-[16px]">{stat.position}</p>
                                <p className="text-[16px]">{stat.kills}/{stat.deaths}/{stat.assists}</p>
                                <p className="text-[16px]">Vis: {stat.visionScore}</p>
                            </div>
                        ))
                    }
                </div>                            
            )) }
        </div>
    );
}

function MatchesByPosition({ matchesByPositionArray, playerIdToNameAndTagLine }: { matchesByPositionArray: Record<string, PlayerStat[]>; playerIdToNameAndTagLine: Map<string, { displayName: string; tagLine: string }>; }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
            { Object.keys(matchesByPositionArray).map((position: string) => (
                <div key={position} className="flex flex-col gap-[8px] bg-amber-950 p-4">
                    <h2 className="text-[24px] font-bold">{position}</h2>
                    {
                        matchesByPositionArray[position].map((stat) => (
                            <div className="flex bg-[#0a0a0a] rounded-xl p-[6px] pr-[10px] pl-[10px] flex-row gap-[20px] justify-between" key={stat.playerId + stat.gameId}>
                                <p className="text-[16px]">{playerIdToNameAndTagLine.get(stat.playerId)?.displayName}</p>
                                <p className="text-[16px]">{stat.kills}/{stat.deaths}/{stat.assists}</p>
                                <p className="text-[16px]">Vis: {stat.visionScore}</p>
                            </div>
                        ))
                    }
                </div>                            
            )) }
        </div>
    );
}
