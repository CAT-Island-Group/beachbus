<script lang='ts'>
    import Navbar from "../Navbar.svelte";
    import { startScan, type NFCresult } from "../NFCReader";

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx4ggNymlULCuGalRAcPdwweTPPZUOem74ZFWe0-8Q6fwDvoN8EM2kyMx02QWavrtzPUQ/exec';

    let message = $state("");
    let NFCerror = $state(false);

    let isScanActive = $state(false);
    let isScanPending = $state(false);
    const scanHandler = async (NFCres: NFCresult) => {
        if (NFCres.error) {
            message = NFCres.error;
            NFCerror = true;
        } else {
            isScanPending = true;
            const uid = NFCres.uid!;
            const response = await fetch(`${GOOGLE_SCRIPT_URL}?uid=${encodeURIComponent(uid)}`);
            const { status, expiry } = await response.json();

            if (status === 'valid') {
              message = `✅ VALID - Expires: ${expiry}`;
              NFCerror = false;
            } else if (status === 'expired') {
              message = `❌ EXPIRED - Expired: ${expiry}`;
              NFCerror = true;
            } else {
              message = `⚠️ NOT FOUND`;
              NFCerror = true;
            }
            isScanPending = false;
        }
    };

    const buttonHandler = async () => {
        await startScan(scanHandler);
        if (!NFCerror) isScanActive = true;
    }

</script>

<main class="w-full">
    <div class="w-90 mx-4 py-12 flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg">
        <div class="w-full p-12 flex flex-col items-center">
            <h1 class="text-xl font-bold">BeachBus Reader</h1>
            <Navbar />
            <div class="relative my-16 flex justify-center items-center size-40">
                {#if isScanPending}
                    <svg class="absolute size-16 animate-spin text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {:else}
                    <span class={`absolute inline-flex rounded-full size-full bg-sky-500 ${isScanActive ? "animate-ping" : ""}`}></span>
                    <span class="relative inline-flex rounded-full size-full bg-sky-400"></span>
                {/if}
            </div>
            {#if !isScanActive && !NFCerror}
                <button onclick={buttonHandler} class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Start NFC Scan
                </button>
            {/if}
            <p class={`${NFCerror ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
        </div>
    </div>
</main>