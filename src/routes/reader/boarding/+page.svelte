<script lang='ts'>
    import { onMount } from "svelte";
    import { NFCScanner } from "../NFCScanner.svelte";
    import CardInfo from "../CardInfo.svelte";

    let nfc: NFCScanner | null = $state(null);
    let error = $state(false);

    onMount(() => {
        nfc = ("NDEFReader" in window) ? new NFCScanner(scanHandler) : null;

        if (nfc) return () => nfc!.stop();
    })

    let card: Card | null = $state(null);
    const scanHandler = async (uid?: string) => {
        card = null;
        if (!uid) {
            error = true;
            return;
        }

        try {
            const response = await fetch("/api/boarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid })
            });

            if (!response.ok) {
                throw new Error("fetch error");
            }

            const result: Card[] = await response.json();
            if (!result.length) {
                throw new Error("not found");
            } else {
                card = result[0];
            }

        } catch (e) {
            console.error(e);
            error = true;
        }
    };

</script>

<main class="w-full">
    <div class="w-90 mx-auto py-12 flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg">
        <div class="w-full p-8 flex flex-col items-center">
            <h1 class="text-xl font-bold">BeachBus Reader</h1>
            <h2 class="border-b border-sky-600 text-sky-600 text-lg font-bold">Checker</h2>
            <div class="relative my-16 flex justify-center items-center size-40">
                {#if nfc?.isPending}
                    <svg class="absolute size-16 animate-spin text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {:else}
                    <span class={`absolute inline-flex rounded-full size-full bg-sky-500 ${nfc?.isActive ? "animate-ping" : ""}`}></span>
                    <span class="relative inline-flex rounded-full size-full bg-sky-400"></span>
                {/if}
            </div>
            {#if !nfc}
                <p class="text-red-600">
                    Web NFC is not supported on this device.
                </p>
            {:else if !nfc.error && !nfc.isActive}
                <button onclick={() => nfc!.start()} class="block px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
                    Start NFC Scan
                </button>
            {:else}
                <button onclick={() => nfc!.stop()} class="block px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600">
                    Stop NFC Scan
                </button>
            {/if}
            {#if card}
                <CardInfo {card}/>
            {:else if error}
                <p class="text-red-600">⚠️ Card not found.</p>
            {/if}
        </div>
    </div>
</main>