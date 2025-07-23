import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { uid }: { uid: string } = await request.json();
        const row = await db.select().from(table.card).where(eq(table.card.uid, uid));

        return json(row);
    } catch (e) {
        console.error(e);
        error(400);
    }
}