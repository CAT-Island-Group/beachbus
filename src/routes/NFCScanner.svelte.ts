export class NFCScanner {
    #ndef: NDEFReader | null;
    #controller: AbortController;
    #signal: AbortSignal;
    isActive = $state(false);
    isPending = $state(false);
    error = $state(false);

    constructor() {
        this.#controller = new AbortController();
        this.#signal = this.#controller.signal;
        
        if ("NDEFReader" in window) {
            this.#ndef = new NDEFReader();
        } else {
            this.#ndef = null;
            this.error = true;
        }
    }

    async start(handler: (uid?: string) => Promise<void>) {
        if (!this.#ndef || this.isActive) return;

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

        try {
            await this.#ndef.scan({ signal: this.#signal });
        } catch (error) {
            console.error(error);
        }
        this.isActive = true;
    }

    stop() {
        if (!this.#ndef || !this.isActive) return;

        this.#controller.abort();
        this.isActive = false;
        this.isPending = false;
    }
}