import { requireLogin } from '$lib/server/auth.js';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { and, count, eq, sql } from 'drizzle-orm';
import { unionAll } from 'drizzle-orm/pg-core';

export const load = async () => {
    const user = requireLogin();
    const countData = await unionAll(
		db.select({
			category: sql<string>`cast(${table.card.usage} as text)`,
			count: count()
		}).from(table.card)
		.where(and(
			eq(table.card.type, 'Regular'),
			eq(table.card.status, 'Registered')
		)).groupBy(table.card.usage),
		db.select({
			category: sql<string>`cast(${table.card.status} as text)`,
			count: count()
		}).from(table.card)
		.where(eq(table.card.type, 'Employee'))
		.groupBy(table.card.status)
	)

	const adminCount = Object.fromEntries(countData.map(e => [e.category, e.count]));

    return {
        user,
        adminCount
    };
};