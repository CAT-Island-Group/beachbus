import { db } from "$lib/server/db/index.js";
import { fail } from "@sveltejs/kit";
import * as table from "$lib/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { READER_MODES, BUS_STOPS, type READER_MODE, type BUS_STOP } from "$lib/consts";
import { requireLogin } from "$lib/server/auth.js";

export const load = async ({ locals }) => {
    const user = requireLogin();

    return {
        user,
        config: locals.config,
        readers: await db.select({
            id: table.reader.id,
            mode: table.reader.mode,
            location: table.reader.location
        }).from(table.reader)
        .orderBy(asc(table.reader.location), asc(table.reader.mode))
    };
}

export const actions = {
    register: async ({ request, locals, cookies }) => {
        if (!locals.user) {
            return fail(401);
        }

        const formData = await request.formData();
        const mode = formData.get('mode');
        const location = formData.get('location');

        if (!validateMode(mode) || !validateLocation(location)) {
            return fail(400);
        }

        let readerId = cookies.get('reader_id');
        const reader = {
            mode,
            location,
            createdBy: locals.user.id
        };

        [{ readerId }] = await db.insert(table.reader)
            .values({ ...(readerId && { readerId }), ...reader })
            .onConflictDoUpdate({ target: table.reader.id, set: reader })
            .returning({ readerId: table.reader.id });

        cookies.set('reader_id', readerId, {
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        });

        return { success: true };
    },
    unregister: async ({ request, locals, cookies}) => {
        if (!locals.user) {
            return fail(401);
        }

        const formData = await request.formData();
        const reader_id = formData.get('reader_id');

        if (typeof reader_id !== 'string') {
            return fail(400);
        }

        try {
            await db.delete(table.reader).where(eq(table.reader.id, reader_id));
        } catch {
            return fail(400);
        }

        return { success: true }
    }
}

function validateMode(mode: unknown): mode is READER_MODE {
    return (
        typeof mode === 'string' &&
        READER_MODES.includes(mode as READER_MODE)
    );
}

function validateLocation(location: unknown): location is BUS_STOP {
    return (
        typeof location === 'string' &&
        BUS_STOPS.includes(location as BUS_STOP)
    );
}