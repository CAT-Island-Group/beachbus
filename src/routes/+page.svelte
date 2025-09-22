<script lang='ts'>
    import { onDestroy } from "svelte";
    import { NFCScanner } from "$lib/NFCScanner.svelte";
    import CardInfo from "./CardInfo.svelte";
    import { applyAction, deserialize } from "$app/forms";
    import { Separator } from "$lib/components/ui/separator";

    const { data, form } = $props();
    const { config } = data;
    const card = $derived(form?.card);
    const error = $derived(form?.error);

    const scanHandler = async (uid?: string) => {
        try {
            if (!uid) {
                throw new Error("card not recognized");
            }

            const formData = new FormData();
            formData.append('uid', uid);

            const response = await fetch(`?/${config.mode.toLowerCase()}`, {
                method: "POST",
                body: formData
            });

            const result = deserialize(await response.text());
            applyAction(result);
        } catch (e) {
            console.error(e);
        }
    };

    const nfc = new NFCScanner(scanHandler);

    onDestroy(() => nfc.stop())
</script>

<header class="fixed w-full h-12 px-4 flex justify-between items-center border shadow">
    <h1 class="text-base font-medium">BeachBus</h1>
    <span class="text-gray-400 font-medium">{config.location}</span>
</header>
<main class="pt-20 px-8 pb-8 flex justify-center align-center">
    <div class="max-w-100 h-full rounded-lg shadow-lg">
        <div class="w-full py-8 px-4 flex flex-col items-center gap-8">
            <h2 class="border-b border-sky-600 text-sky-600 text-xl font-bold">{config.mode}</h2>
            <div class="relative flex justify-center items-center size-40">
                {#if nfc.isPending}
                    <svg class="absolute size-16 animate-spin text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class={`lucide lucide-smartphone-nfc-icon lucide-smartphone-nfc size-full transition duration-700 ${nfc.isActive ? 'animate-pulse' : 'text-slate-200'}`}><rect width="7" height="12" x="2" y="6" rx="1"/><path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/></svg>
                {/if}
            </div>
            {#if !nfc.isNFC}
                <p class="text-red-600">
                    Web NFC is not supported on this device.
                </p>
            {:else if !nfc.error && !nfc.isActive}
                <button onclick={() => nfc.start()} class="block px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
                    Start NFC Scan
                </button>
            {:else}
                <button onclick={() => nfc.stop()} class="block px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600">
                    Stop NFC Scan
                </button>
            {/if}
            <Separator />
            {#if card}
                <CardInfo {card}/>
            {:else if error}
                <p class="text-red-600">Card not found.</p>
            {/if}
        </div>
    </div>
</main>