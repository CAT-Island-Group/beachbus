import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { uid }: { uid: string } = await request.json();
        let row = await db.select().from(table.card).where(eq(table.card.uid, uid));

        if (!row.length) {
            return json(row);
        }

        const card = row[0];

        if (card.status === "Registered") {
            return json(row);
        }

        if (card.status === "Active") {
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * (card.type === "Regular" ? card.usage : 30)).toISOString();
            row = await db.update(table.card)
                .set({
                    status: "Used",
                    expiresAt
                })
                .where(eq(table.card.uid, uid))
                .returning();
        }

        // dont update with returning to
        // reflect number of uses on use
        if (card.type === "Employee" && card.usage > 0) {
            await db.update(table.card)
                .set({ usage: card.usage - 1 })
                .where(eq(table.card.uid, uid));
        }

        const readerId = cookies.get("id")!;
        const log = {
            type: "Boarding" as const,
            cardId: uid,
            readerId,
        }

        await db.insert(table.cardLog).values(log);

        return json(row);
    } catch (e) {
        console.error(e);
        error(400);
    }
}