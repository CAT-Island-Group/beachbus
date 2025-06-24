import { db } from '$lib/server/db';
import { readersTable } from '$lib/server/db/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
    const { url, cookies } = event;
	if (url.pathname === "/" || url.pathname === "/reader/checker" || url.pathname === "/api/registerReader") {
		return await resolve(event);
	}

    const readerId = cookies.get("id");
    if (!readerId) { // unregistered device
        redirect(303, "/");
    }

	const row = await db.select().from(readersTable).where(eq(readersTable.id, readerId));
    if (!row.length) { // possibly malicious req
        redirect(303, "/");
    }

    if (url.pathname.startsWith("/api")) {
        return await resolve(event);
    }

    const { mode } = row[0];
    const targetUrl = "/reader/" + mode.toLowerCase();
    if (url.pathname === targetUrl) {
        return await resolve(event);
    }
    redirect(303, targetUrl);
};
