// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			config: {
				mode: string,
				location: string,
				name: string
			} | undefined
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	// Type definitions for Web NFC
	// Project: https://github.com/w3c/web-nfc
	// Definitions by: Takefumi Yoshii <https://github.com/takefumi-yoshii>
	// TypeScript Version: 3.9

	// This type definitions referenced to WebIDL.
	// https://w3c.github.io/web-nfc/#actual-idl-index

	interface Card {
        uid: string,
        type: "Regular" | "Employee",
        usage: number,
        status: "Registered" | "Active" | "Used",
        expiresAt?: string
    }

	interface Window {
		NDEFMessage: NDEFMessage
	}

	declare class NDEFMessage {
		constructor(messageInit: NDEFMessageInit)
		records: ReadonlyArray<NDEFRecord>
	}

	declare interface NDEFMessageInit {
		records: NDEFRecordInit[]
	}

	declare type NDEFRecordDataSource = string | BufferSource | NDEFMessageInit

	interface Window {
		NDEFRecord: NDEFRecord
	}

	declare class NDEFRecord {
		constructor(recordInit: NDEFRecordInit)
		readonly recordType: string
		readonly mediaType?: string
		readonly id?: string
		readonly data?: DataView
		readonly encoding?: string
		readonly lang?: string
		toRecords?: () => NDEFRecord[]
	}

	declare interface NDEFRecordInit {
		recordType: string
		mediaType?: string
		id?: string
		encoding?: string
		lang?: string
		data?: NDEFRecordDataSource
	}

	declare type NDEFMessageSource = string | BufferSource | NDEFMessageInit

	interface Window {
		NDEFReader: NDEFReader
	}

	declare class NDEFReader extends EventTarget {
		constructor()
		onreading: (this: this, event: NDEFReadingEvent) => any
		onreadingerror: (this: this, error: Event) => any
		scan: (options?: NDEFScanOptions) => Promise<void>
		write: (
			message: NDEFMessageSource,
			options?: NDEFWriteOptions
		) => Promise<void>
	}

	interface Window {
		NDEFReadingEvent: NDEFReadingEvent
	}

	declare class NDEFReadingEvent extends Event {
		constructor(type: string, readingEventInitDict: NDEFReadingEventInit)
		serialNumber: string
		message: NDEFMessage
	}

	interface NDEFReadingEventInit extends EventInit {
		serialNumber?: string
		message: NDEFMessageInit
	}

	interface NDEFWriteOptions {
		overwrite?: boolean
		signal?: AbortSignal
	}

	interface NDEFScanOptions {
		signal: AbortSignal
	}
}

export {};
