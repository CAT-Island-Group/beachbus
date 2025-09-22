import { requireLogin } from '$lib/server/auth.js';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load = async ({ parent }) => {
	const user = requireLogin();
	const busStops = await db.select().from(table.busStop);
	const { adminCount } = await parent();

	return {
		user,
		adminCount,
		busStops
	}
};