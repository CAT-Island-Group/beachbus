import { db } from "$lib/server/db";
import { readersTable } from "$lib/server/db/schema";
import { error, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        const { mode, stop, name }: { mode: string, stop: string, name: string} = await request.json();

        const reader = {
            mode,
            name,
            location: stop
        }

        const row = await db.insert(readersTable).values(reader).returning({ id: readersTable.id });

        const { id } = row[0];
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