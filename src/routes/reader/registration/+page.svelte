<script lang='ts'>
    import { onMount } from "svelte";
    import { NFCScanner } from "../NFCScanner.svelte";

    let message = $state("");
    let error = $state(false);

    let nfc: NFCScanner | undefined = $state();

    onMount(() => {
        nfc = new NFCScanner(scanHandler);
        if (nfc.error) {
            message = "Web NFC is not supported for this device.";
            error = true;
        }

        return () => nfc?.stop();
    })

    let type = $state("Regular");
    let duration = $state("1");

    const scanHandler = async (uid?: string) => {
        if (!uid) {
            message = "An error occured.";
            error = true;
            return;
        }

        try {
            const response = await fetch("/api/registerCard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, type, duration })
            });

            if (response.ok) {
                const card = await response.json();
                if (card) {
                    message = "✅ Card registration successful.";
                    error = false;
                } else {
                    message = "⚠️ Card already registered.";
                    error = true;
                }
            } else {
                throw new Error("fetch error");
            }
        } catch (e) {
            console.error(e);
            message = "❌ An error occurred.";
            error = true;
        }
    };

</script>

<main class="w-full">
    <div class="w-90 mx-auto py-12 flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg">
        <div class="w-full p-12 flex flex-col items-center">
            <h1 class="text-xl font-bold">BeachBus Reader</h1>
            <h2 class="border-b border-sky-600 text-sky-600 text-lg font-bold">Registration</h2>
            <div class="relative my-16 flex justify-center items-center size-40">
                {#if nfc?.isPending}
                    <svg class="absolute size-16 animate-spin text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {:else}
                    <span class={`absolute inline-flex rounded-full size-full bg-sky-500 ${nfc?.isActive ? "animate-ping" : ""}`}></span>
                    <span class="relative inline-flex rounded-full size-full bg-sky-400"></span>
                {/if}
            </div>
            {#if nfc && !nfc.error && !nfc.isActive}
                <button onclick={() => nfc!.start()} class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Start NFC Scan
                </button>
            {/if}
            <p class={`${error ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
        </div>
        {#if nfc?.isActive}
            <form class="flex flex-col gap-4">
                <!-- Type Selection -->
                <fieldset disabled={nfc.isPending}>
                    <legend class="text-lg">Type</legend>
                    {#each ["Regular", "Employee"] as pass_type}
                        <label class="p-2 text-xl">
                            <input type="radio" bind:group={type} value={pass_type} />
                            {pass_type}
                        </label>
                    {/each}
                </fieldset>

                <!-- Duration Selection -->
                <fieldset disabled={nfc.isPending || type === 'Employee'}>
                <legend class="text-xl">Duration</legend>
                    {#each ["1", "3", "5"] as pass_duration}
                        <label class="p-2 text-xl">
                            <input type="radio" bind:group={duration} value={pass_duration} />
                            {pass_duration}
                        </label>
                    {/each}
                </fieldset>
            </form>
        {/if}
    </div>
</main>