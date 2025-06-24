import { pgTable, pgEnum, varchar, serial, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const type = pgEnum('type', ['Regular', 'Employee']);
export const status = pgEnum('status', ['Registered', 'Active', 'Used']);
export const log_type = pgEnum('log_type', ['Registration', 'Activation', 'Boarding', 'Checker']);

export const cardsTable = pgTable('cards', {
	uid: varchar('uid', { length: 11 }).primaryKey(),
	type: type(),
	usage: integer('usage').notNull(),
	status: status(),
	expiresAt: timestamp('expiresAt', {
		withTimezone: true,
		mode: 'date',
	}),
});

export const readersTable = pgTable('readers', {
	id: uuid().defaultRandom().primaryKey(),
	mode: varchar('mode', { length: 256 }).notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	location: varchar('location', { length: 256 }).notNull()
});

export const cardLog = pgTable('card_log', {
	id: uuid().defaultRandom().primaryKey(),
	type: log_type(),
	card_id: varchar('card_id', { length: 11 }).references(() => cardsTable.uid),
	reader_id: uuid().references(() => readersTable.id),
	timestamp: timestamp('timestamp', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});