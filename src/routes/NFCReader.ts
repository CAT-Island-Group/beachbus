export type NFCresult = {
    uid?: string,
    error?: string
}

export async function scanNFC(cb: (s: NFCresult) => void) {
    try {
        if ("NDEFReader" in window) {
            const ndef = new NDEFReader();
            await ndef.scan();

            ndef.onreading = (event) => {
                const uid = event.serialNumber;

                if (!uid) return null;

                cb({ uid });
            };

            ndef.onreadingerror = () => {
                cb({error: "NFC scan failed."});
            };
        } else {
            cb({error: "Web NFC is not supported on this device."});
        }
    } catch (error) {
        cb({ error });
    }
}