import { fail } from '@sveltejs/kit';
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { CARD_TYPES, CARD_DURATIONS, type CARD_TYPE, type CARD_DURATION } from '$lib/consts.js';
import { requireLogin } from '$lib/server/auth.js';

export const load = async () => {
    requireLogin();
}

export const actions = {
    register: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401);
        }

        const formData = await request.formData();
        const uid = formData.get('uid');
        const type = formData.get('type');
        const duration = formData.get('duration');

        if (!validateType(type)) {
            return fail(400, { error: true });
        }

        if (type === 'Regular' && !validateDuration(duration)) {
            return fail(400, { error: true });
        }

        if (typeof uid !== 'string') {
            return fail(400, { error: true });
        }

        try {
            let [ card ] = await db.insert(table.card)
                .values({
                    uid,
                    type,
                    usage: type === "Regular" ? Number(duration) : 2,
                    status: "Registered",
                    createdBy: locals.user.id
                }).onConflictDoNothing()
                .returning();

            if (card) { // registered successfully
                return { success: true, card, error: false };
            }

            // no card returned means already registered,
            // retrieve card with same uid
            [ card ] = await db.select()
                .from(table.card)
                .where(eq(table.card.uid, uid));
            
            return { success: true, card, error: true };
        } catch (e) {
            console.error(e);
            fail(400, { error: true });
        }
    }
}

function validateType(type: unknown): type is CARD_TYPE {
    return (
        typeof type === 'string' &&
        CARD_TYPES.includes(type as CARD_TYPE)
    )
}

function validateDuration(duration: unknown): duration is CARD_DURATION {
    return (
        typeof duration === 'string' &&
        CARD_DURATIONS.includes(duration as CARD_DURATION)
    )
}