export class NFCScanner {
    #ndef: NDEFReader | null;
    #controller: AbortController;
    #signal: AbortSignal;
    isNFC = $state(false);
    isActive = $state(false);
    isPending = $state(false);
    error = $state(false);

    constructor(handler: (uid?: string) => Promise<void>) {
        this.#controller = new AbortController();
        this.#signal = this.#controller.signal;

        if ("NDEFReader" in window) {
            this.isNFC = true;
        } else {
            this.#ndef = null;
            return;
        }

        this.#ndef = new NDEFReader();

        this.#ndef.onreading = async (event) => {
            this.isPending = true;
            this.error = false;

            const uid = event.serialNumber;
            await handler(uid);
            this.isPending = false;
        }

        this.#ndef.onreadingerror = async () => {
            this.isPending = true;
            this.error = true;

            await handler();
            this.isPending = false;
        }
    }

    async start() {
        if (!this.#ndef || this.isActive) return;

        try {
            await this.#ndef.scan({ signal: this.#signal });
            this.isActive = true;
        } catch (error) {
            console.error(error);
        }
    }

    stop() {
        if (!this.#ndef || !this.isActive) return;

        this.#controller.abort();
        this.isActive = false;
        this.isPending = false;
    }
}