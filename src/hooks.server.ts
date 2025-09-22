import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { redirect, type Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import * as auth from "$lib/server/auth";
import { sequence } from '@sveltejs/kit/hooks';

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
}

const handleConfig: Handle = async ({ event, resolve }) => {
	const readerId = event.cookies.get("reader_id");
    if (!readerId) {
        return resolve(event);
    }

    const [ config ] = await db.select({
		id: table.reader.id,
        mode: table.reader.mode,
        location: table.reader.location,
    }).from(table.reader).where(eq(table.reader.id, readerId));

	if (config) {
		event.locals.config = config;
	} else {
		event.cookies.delete("reader_id", { path: "/" });
	}
    return resolve(event);
}

export const handle = sequence(handleAuth, handleConfig);