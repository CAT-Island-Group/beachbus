import { pgTable, pgEnum, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const type = pgEnum('type', ['Regular', 'Employee']);
export const status = pgEnum('status', ['Registered', 'Active', 'Used']);
export const log_type = pgEnum('log_type', ['Registration', 'Activation', 'Boarding']);
export const role = pgEnum('role', ['Admin', 'Activation', 'Boarding']);

export const card = pgTable('card', {
	uid: text('uid').primaryKey(),
	type: type().notNull(),
	usage: integer('usage').notNull(),
	status: status().notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'string',
	}),
});

export const reader = pgTable('reader', {
	id: uuid().defaultRandom().primaryKey(),
	mode: text('mode').notNull(),
	name: text('name').notNull(),
	location: text('location').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull()
});

export const cardLog = pgTable('card_log', {
	id: uuid().defaultRandom().primaryKey(),
	type: log_type().notNull(),
	cardId: text('cardId').references(() => card.uid).notNull(),
	readerId: uuid().references(() => reader.id).notNull(),
	timestamp: timestamp('timestamp', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull(),
});

export const user = pgTable('user', {
	id: uuid().defaultRandom().primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	orgId: uuid().references(() => org.id).notNull(),
	role: role().notNull(),
	lastLogin: timestamp('last_login', {
		withTimezone: true,
		mode: 'date'
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull()
});

export const org = pgTable('organization', {
	id: uuid().defaultRandom().primaryKey(),
	name: text('name').notNull(),
	cardCount: integer('card_count').default(0).notNull()
})

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid().references(() => user.id).notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;