import { neon } from "@neondatabase/serverless";
import { hash } from "@node-rs/argon2";

if (!process.env.DATABASE_URL) {
    throw new Error("database url not set");
}

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    throw new Error("account credentials not set")
}

const sql = neon(process.env.DATABASE_URL);

const passwordHash = await hash(process.env.ADMIN_PASSWORD, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
});

await sql`
    INSERT INTO "public"."user" (username, password_hash)
    VALUES (${process.env.ADMIN_USERNAME}, ${passwordHash})
`