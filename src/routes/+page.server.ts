import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const load: PageServerLoad = ({ locals }) => {
    const { config } = locals;
    if (!config) {
        redirect(303, '/admin/readers');
    }
    return { config };
}

export const actions = {
    activation: async ({ request, locals }) => {
        if (!locals.config || locals.config.mode !== 'Activation') {
            return fail(401);
        }

        const formData = await request.formData();
        const uid = formData.get('uid');

        if (typeof uid !== 'string') {
            return fail(400, { error: true });
        }

        try {
            let [ card ] = await db.select()
                .from(table.card)
                .where(eq(table.card.uid, uid));

            if (!card) {
                throw new Error("not found");
            }

            if (card.status === "Registered") {
                [ card ] = await db.update(table.card)
                    .set({
                        status: "Active",
                        activatedAt: new Date(Date.now()),
                        activatedAtStop: locals.config.location,
                        ...(card.type === "Employee" &&
                            { expiresAt: new Date(Date.now() * DAY_IN_MS * 30) })
                    }).where(eq(table.card.uid, uid))
                    .returning();
            }

            return { success: true, card, error: false };
        } catch (e) {
            console.error(e);
            return fail(400, { error: true });
        }
    },
    boarding: async ({ request, locals, cookies }) => {
        if (!locals.config || locals.config.mode !== 'Boarding') {
            return fail(401);
        }

        const formData = await request.formData();
        const uid = formData.get('uid');

        if (typeof uid !== 'string') {
            return fail(400, { error: true });
        }

        try {
            let [ card ] = await db.select()
                .from(table.card)
                .where(eq(table.card.uid, uid));
            
            if (!card) {
                throw new Error("not found");
            }

            if (card.type === "Regular" && !card.expiresAt) {
                [ card ] = await db.update(table.card)
                    .set({ expiresAt: new Date(Date.now() + DAY_IN_MS * card.usage) })
                    .where(eq(table.card.uid, uid))
                    .returning();
            }

            if (card.type === "Employee" && card.usage > 0) {
                // no returning to reflect number of uses
                await db.update(table.card)
                    .set({ usage: card.usage - 1})
                    .where(eq(table.card.uid, uid));
            }

            const readerId = cookies.get("reader_id")!;
            await db.insert(table.boardingLog)
                .values({
                    cardId: uid,
                    readerId,
                    location: locals.config.location
                });

            return { success: true, card, error: false }
        } catch (e) {
            console.error(e);
            return fail(400, { error: true });
        }
    }
}