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
            row = await db.update(table.card)
                .set({ status: "Active" })
                .where(eq(table.card.uid, uid))
                .returning();

            const readerId = cookies.get("id")!;
            const log = {
                type: "Activation" as const,
                cardId: uid,
                readerId,
            }

            await db.insert(table.cardLog).values(log);
        }

        return json(row);
    } catch (e) {
        console.error(e);
        error(400);
    }
}