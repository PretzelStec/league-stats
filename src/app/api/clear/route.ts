import { cache } from "@/infrastructure/cache";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type ResponseData = {
	message: string;
};

export function GET() {
    try {
        cache.delete("players");
        cache.delete("player-stats");
        revalidatePath("");
        return NextResponse.json({ message: "complete" });
    } catch (err) {
        console.error("Error clearing cache:", err);
        return NextResponse.json({ message: "Error clearing cache" });
    }
}
