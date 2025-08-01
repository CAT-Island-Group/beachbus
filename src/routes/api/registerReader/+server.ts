import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { mode, stop: location, name }: { mode: string, stop: string, name: string} = await request.json();

        if (!mode || !location || !name) throw new Error("invalid input");

        let id = cookies.get("id");
        const reader = {
            mode,
            name,
            location
        }

        const row = await db.insert(table.reader)
            .values({ ...(id) && { id }, ...reader }) // short circuit AND
            .onConflictDoUpdate({ target: table.reader.id, set: reader })
            .returning({ id: table.reader.id });

        id = row[0].id;
        cookies.set("id", id, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365
        });

        return new Response(null, { status: 204 });

    } catch (e) {
        console.error(e);
        return error(400);
    }
}