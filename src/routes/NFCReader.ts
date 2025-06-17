export type NFCresult = {
    uid?: string,
    error?: string
}

export async function startScan(handler: (s: NFCresult) => void) {
    try {
        if ("NDEFReader" in window) {
            const ndef = new NDEFReader();
            await ndef.scan();

            ndef.onreading = (event) => {
                const uid = event.serialNumber;

                if (!uid) return null;

                handler({ uid });
            };

            ndef.onreadingerror = () => {
                handler({error: "NFC scan failed."});
            };
        } else {
            handler({error: "Web NFC is not supported on this device."});
        }
    } catch (error) {
        handler({ error });
    }
}