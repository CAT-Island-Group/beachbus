export class NFCScanner {
    #ndef: NDEFReader | null;
    #controller: AbortController;
    #signal: AbortSignal;
    #isActive: boolean;
    #isPending: boolean;
    #error: boolean;

    constructor(handler: (uid?: string) => Promise<void>) {
        this.#isActive = $state(false);
        this.#isPending = $state(false);
        this.#error = $state(false);
        this.#controller = new AbortController();
        this.#signal = this.#controller.signal;

        if (!("NDEFReader" in window)) {
            this.#ndef = null;
            this.#error = true;
            return;
        }

        this.#ndef = new NDEFReader();

        this.#ndef.onreading = async (event) => {
            this.#isPending = true;
            this.#error = false;

            const uid = event.serialNumber;
            await handler(uid);
            this.#isPending = false;
        }

        this.#ndef.onreadingerror = async () => {
            this.#isPending = true;
            this.#error = true;

            await handler();
            this.#isPending = false;
        }
    }

    async start() {
        if (this.#isActive) return;

        try {
            await this.#ndef?.scan({ signal: this.#signal });
        } catch (error) {
            console.error(error);
        }
        this.#isActive = true;
    }

    stop() {
        if (!this.#isActive) return;

        this.#controller.abort();
        this.#isActive = false;
        this.#isPending = false;
    }

    get isActive() {
        return this.#isActive;
    }

    get isPending() {
        return this.#isPending;
    }

    get error() {
        return this.#error;
    }
}