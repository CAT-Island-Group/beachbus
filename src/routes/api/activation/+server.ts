import { db } from "$lib/server/db";
import { cardLog, cardsTable } from "$lib/server/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { uid }: { uid: string } = await request.json();
        let row = await db.select().from(cardsTable).where(eq(cardsTable.uid, uid));

        if (!row.length) {
            return json(row);
        }

        const card = row[0];

        if (card.status === "Registered") {
            row = await db.update(cardsTable)
                .set({ status: "Active" })
                .where(eq(cardsTable.uid, uid))
                .returning();

            const reader_id = cookies.get("id")!;
            const log = {
                type: "Activation" as const,
                card_id: uid,
                reader_id,
            }
    
            await db.insert(cardLog).values(log);
        }

        return json(row);
    } catch (e) {
        console.error(e);
        error(400);
    }
}