import { pgTable, pgEnum, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { READER_MODES, BUS_STOPS } from '../../consts';

export const card_type = pgEnum('card_type', ['Regular', 'Employee']);
export const card_status = pgEnum('card_status', ['Registered', 'Active', 'Used']);
export const reader_mode = pgEnum('reader_modes', READER_MODES);
export const bus_stops = pgEnum('bus_stops', BUS_STOPS);

export const card = pgTable('card', {
	uid: text('uid').primaryKey(),
	type: card_type().notNull(),
	usage: integer('usage').notNull(),
	status: card_status().notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date',
	}).defaultNow().notNull(),
	activatedAt: timestamp('activated_at', {
		withTimezone: true,
		mode: 'date'
	}),
	activatedAtStop: bus_stops('activated_at_stop'),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date',
	}),
	createdBy: uuid('created_by').references(() => user.id).notNull()
});

export const reader = pgTable('reader', {
	id: uuid().defaultRandom().primaryKey(),
	mode: reader_mode().notNull(),
	location: bus_stops().notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull(),
	createdBy: uuid('created_by').references(() => user.id).notNull()
});

export const boardingLog = pgTable('boarding_log', {
	id: uuid().defaultRandom().primaryKey(),
	cardId: text('card_id').references(() => card.uid).notNull(),
	readerId: uuid('reader_id').references(() => reader.id, { onDelete: 'set null' }),
	location: bus_stops().notNull(),
	timestamp: timestamp('timestamp', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull(),
});

export const busStop = pgTable('bus_stop', {
	id: uuid().defaultRandom().primaryKey(),
	name: bus_stops().notNull(),
	cardCountReg1: integer('card_count_regular_1').default(0).notNull(),
	cardCountReg3: integer('card_count_regular_3').default(0).notNull(),
	cardCountReg5: integer('card_count_regular_5').default(0).notNull(),
	cardCountEmployee: integer('card_count_employee').default(0).notNull(),
})

export const user = pgTable('user', {
	id: uuid().defaultRandom().primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	lastLogin: timestamp('last_login', {
		withTimezone: true,
		mode: 'date'
	}),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).defaultNow().notNull(),
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id').references(() => user.id).notNull(),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = typeof user.$inferSelect;
export type Session = typeof session.$inferSelect;