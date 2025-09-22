import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { hash } from '@node-rs/argon2';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(env.DATABASE_URL);

export const db = drizzle(client, { schema });

if (env.ADMIN_USERNAME && env.ADMIN_PASSWORD) {
    try {
        const passwordHash = await hash(env.ADMIN_PASSWORD, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });
        const user = {
            username: env.ADMIN_USERNAME,
            passwordHash
        };
        await db.insert(schema.user).values(user).onConflictDoNothing();
        console.log(user);
    } catch(e) {
        console.log(e);
    }
}