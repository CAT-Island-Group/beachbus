import { error, json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

type UserType = "Regular" | "Employee";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { uid, type, duration }: { uid: string, type: UserType, duration: string} = await request.json();

        const card = {
            uid,
            type,
            usage: type === "Regular" ? Number(duration) : 2,
            status: "Registered" as const,
        }

        const row = await db
            .insert(table.card)
            .values(card)
            .onConflictDoNothing()
            .returning();

        if (row.length) {
            const readerId = cookies.get("id")!;
            const log = {
                type: "Registration" as const,
                cardId: uid,
                readerId,
            }

            await db.insert(table.cardLog).values(log);
            return json(row[0]);
        }
    } catch (e) {
        console.error(e);
        error(500);
    }

    return json(null);
}