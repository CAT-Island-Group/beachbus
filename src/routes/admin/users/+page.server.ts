import { hash } from '@node-rs/argon2';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { requireLogin } from '$lib/server/auth.js';

export const load = async () => {
	requireLogin();
};

export const actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPass');

		if (!validateUsername(username)) {
			return fail(400, { error: 'username', message: 'Username must be at least 6 characters long' });
		}
		if (!validatePassword(password)) {
			return fail(400, { error: 'password', message: 'Password must be at least 8 characters long' });
		}
		if (password !== confirmPassword) {
			return fail(400, { error: 'confirmPass', message: 'Passwords do not match' });
		}

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		try {
			await db.insert(table.user).values({username, passwordHash});
		} catch {
			return fail(500, { message: 'An error has occurred' });
		}
		return { success: true };
	},
};

function validateUsername(username: unknown): username is string {
	return (
		typeof username === 'string' &&
		username.length >= 6 &&
		username.length <= 31 &&
		/^[a-z0-9_-]+$/.test(username)
	);
}

function validatePassword(password: unknown): password is string {
	return (
		typeof password === 'string' &&
		password.length >= 8 &&
		password.length <= 255
	);
}