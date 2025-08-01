import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from "$lib/server/auth";

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = async ({ event, resolve }) => {
    const { url, cookies, locals } = event;

    if (url.pathname === "/reader/checker" || url.pathname.startsWith("/api/")) {
        return await resolve(event);
    }

    let mode = locals.config?.mode.toLowerCase();
	if (mode) {
        if (url.pathname === "/" || url.pathname.endsWith(mode)) {
            return await resolve(event);
        } else {
            redirect(303, "/reader/" + mode);
        }
    }

    const readerId = cookies.get("id");
    if (!readerId) { // unregistered device
        if (url.pathname === "/") {
            return await resolve(event);
        } else {
            redirect(303, "/reader/checker");
        }
    }

	const row = await db.select().from(table.reader).where(eq(table.reader.id, readerId));
    if (!row.length) { // device no longer valid? has cookie but not in db
        redirect(303, "/reader/checker");
    }

    // do something with config
    const { id, ...config } = row[0];
    locals.config = config;
    mode = config.mode.toLowerCase();

    if (url.pathname === "/" || url.pathname.endsWith(mode)) {
        return await resolve(event);
    } else {
        redirect(303, "/reader/" + mode);
    }

};
