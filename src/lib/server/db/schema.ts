import { pgTable, pgEnum, varchar, serial, integer, timestamp } from 'drizzle-orm/pg-core';

const type = pgEnum('type', ['Regular', 'Employee']);
const status = pgEnum('status', ['Registered', 'Received', 'Sold', 'Active']);
const log_type = pgEnum('type', ['Registration', 'Receiving', 'Sale', 'Verify']);

export const cardsTable = pgTable('cards', {
	uid: varchar('uid', { length: 11 }).primaryKey(),
	type: type().notNull(),
	duration: integer('duration').notNull(),
	status: status().notNull(),
	expiresAt: timestamp('expiresAt', {
		withTimezone: true,
		mode: 'date',
	}),
	received_by: varchar('received_by', { length: 256 }),
	recieved_at: timestamp('received_at', {
		withTimezone: true,
		mode: 'date'
	}),
	sold_by: varchar('sold_by', { length: 256 }),
	sold_at: timestamp('sold_at', {
		withTimezone: true,
		mode: 'date'
	}),
});

export const readersTable = pgTable('readers', {
	id: varchar('id', { length: 256 }).primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
});

export const cardLog = pgTable('card_log', {
	id: serial().primaryKey(),
	type: log_type().notNull(),
	card_id: varchar('card_id', { length: 11 }).references(() => cardsTable.uid),
	reader_id: varchar('reader_id', { length: 256 }).references(() => readersTable.id),
	timestamp: timestamp('timestamp').notNull().defaultNow(),
});