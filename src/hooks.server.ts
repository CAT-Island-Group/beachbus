import { db } from '$lib/server/db';
import { readersTable } from '$lib/server/db/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const handle: Handle = async ({ event, resolve }) => {
    const { url, cookies, locals } = event;
	if (url.pathname === "/reader/checker" || url.pathname === "/api/registerReader") {
		return await resolve(event);
	}

    const readerId = cookies.get("id");
    if (!readerId) { // unregistered device
        if (url.pathname !== "/") redirect(303, "/");
        else return await resolve(event);
    }

	const row = await db.select().from(readersTable).where(eq(readersTable.id, readerId));
    if (!row.length) { // possibly malicious req
        if (url.pathname !== "/") redirect(303, "/");
    }

    // device is registered atp, can safely resolve api req
    if (url.pathname.startsWith("/api")) {
        return await resolve(event);
    }

    // do something with config
    const { id, ...config } = row[0];
    const targetUrl = "/reader/" + config.mode.toLowerCase();
    locals.config = config;
    if (url.pathname === "/" || url.pathname === targetUrl) {
        return await resolve(event);
    }
    redirect(303, targetUrl);
};
