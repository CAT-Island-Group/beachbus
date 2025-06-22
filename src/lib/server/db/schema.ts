import { pgTable, pgEnum, varchar, serial, integer, timestamp } from 'drizzle-orm/pg-core';

export const type = pgEnum('type', ['Regular', 'Employee']);
export const status = pgEnum('status', ['Registered', 'Sold', 'Active']);
export const log_type = pgEnum('type', ['Registration', 'Sale', 'Boarding', 'Verification']);

export const cardsTable = pgTable('cards', {
	uid: varchar('uid', { length: 11 }).primaryKey(),
	type: type(),
	usage: integer('usage').notNull(),
	status: status().notNull(),
	expiresAt: timestamp('expiresAt', {
		withTimezone: true,
		mode: 'date',
	}),
});

export const readersTable = pgTable('readers', {
	id: varchar('id', { length: 256 }).primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	location: varchar('location', { length: 256 }).notNull()
});

export const cardLog = pgTable('card_log', {
	id: serial().primaryKey(),
	type: log_type(),
	card_id: varchar('card_id', { length: 11 }).references(() => cardsTable.uid),
	reader_id: varchar('reader_id', { length: 256 }).references(() => readersTable.id),
	timestamp: timestamp('timestamp').notNull().defaultNow(),
});