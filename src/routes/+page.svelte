<script lang="ts">
    import { goto } from "$app/navigation";

    const { data } = $props();
    const { config } = data;

    const modes = ["Registration", "Activation", "Boarding"];
    const stops = ["Here", "There", "Everywhere"];
    let mode = $state(config ? config.mode : "Boarding");
    let stop = $state(config ? config.location : "Here");
    let name = $state(config ? config.name : "");

    // TO-DO:
    // route protection (localstorage check, db check, cookies)
    // form protection (pw based)
    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/registerReader", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mode, stop, name })
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            localStorage.setItem("config", JSON.stringify({ mode, stop, name }));
            goto("/" + mode.toLowerCase());
        } catch (e) {
            console.error(e);
        }
    }

</script>

<main class="w-full">
    <div class="w-90 mx-auto py-16 flex flex-col justify-center items-center rounded-lg shadow-lg">
        <div class="w-full flex flex-col items-center">
            <h1 class="text-xl font-bold">BeachBus Reader</h1>
        </div>
        <h2 class="border-b border-sky-600 text-sky-600 text-lg font-bold">Configuration</h2>
        <form onsubmit={handleSubmit} class="pt-12 flex flex-col gap-4">
            <!-- Mode Selection -->
            <label>
                Device Mode
                <br>
                <select name="mode" bind:value={mode} class="mt-1 p-1 w-full border">
                    {#each modes as mode}
                        <option value={mode}>{mode}</option>
                    {/each}
                </select>
            </label>

            <!-- Stop Selection -->
            <label>
                Device Location
                <br>
                <select name="stop" bind:value={stop} class="mt-1 p-1 w-full border">
                    {#each stops as stop}
                        <option value={stop}>{stop}</option>
                    {/each}
                </select>
            </label>

            <!-- Name Input -->
            <label>
                Device Name
                <br>
                <input name="name" bind:value={name} class="px-2 py-1 border" placeholder='"Lobby"' autocomplete="off" required>
            </label>
            
            <button class="block bg-blue-500 text-white mt-10 px-4 py-2 rounded hover:bg-blue-600">
                Complete
            </button>
        </form>
    </div>
</main>