export class NFCScanner {
    #ndef: NDEFReader | null;
    #controller: AbortController | null;
    isNFC = $state(false);
    isActive = $state(false);
    isPending = $state(false);
    error = $state(false);

    constructor(handler: (uid?: string) => Promise<void>) {
        this.#controller = null;

        if (!("NDEFReader" in window)) {
            this.#ndef = null;
            return;
        }
        
        this.isNFC = true;
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
            this.#controller = new AbortController();
            await this.#ndef.scan({ signal: this.#controller.signal });
            this.isActive = true;
        } catch (error) {
            console.error(error);
        }
    }

    stop() {
        if (!this.#ndef || !this.isActive) return;

        if (this.#controller) {
            this.#controller.abort();
        }
        this.isActive = false;
        this.isPending = false;
    }
}