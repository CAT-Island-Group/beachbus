<script lang='ts'>
    import { scanNFC, type NFCresult } from "./NFCReader";

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWZ4XJ5zn129SnHm2XPNx6GkJerO_0EY8oiYBEgA7dFm4OAjJjkBsliJtgiRMTR8P3zA/exec';
    let form: HTMLFormElement;
    let type = $state("Regular");
    let duration = $state("1");

    let message = $state("Tap an NFC card to read");
    let error = $state(false);

    const handler = async (NFCres: NFCresult) => {
        if (NFCres.error) {
            message = NFCres.error;
            error = true;
        } else {
            // do stuff
            const uid = NFCres.uid!;
            const response = await fetch(`${GOOGLE_SCRIPT_URL}?uid=${encodeURIComponent(uid)}&duration=${duration}`);
            const result = await response.text();

            if (result.includes("status=registered")) {
                message = "✅ New card registered";
            } else if (result.includes("status=re_registered")) {
                message = "🔁 Expired card re-registered";
            } else if (result.includes("status=already_registered")) {
                message = "⚠️ Card is already active";
            } else {
                message = `❌ Unknown response: ${result}`;
                error = true;
            }
        }
    };

</script>

<main class="w-full">
    <div class="mx-4 py-12 flex flex-col justify-center items-center gap-4 rounded-lg shadow-lg">
        <div class="flex flex-col items-center">
            <h1 class="text-xl font-bold">BeachBus Reader</h1>
            <span class="text-lg font-bold">Registration</span>
            <div class="relative inline-block my-16 flex size-40">
                <span class="absolute inline-flex rounded-full size-full bg-sky-500 animate-ping"></span>
                <span class="relative inline-flex rounded-full size-full bg-sky-400"></span>
            </div>
            <button onclick={() => scanNFC(handler)} class="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Start NFC Scan
            </button>
            {#if message}
                <p class={`mt-4 ${error ? 'text-red-600' : 'text-green-600'}`}>{message}</p>
            {/if}
        </div>
        <form bind:this={form} class="flex flex-col gap-4">
            <!-- Type Selection -->
            <fieldset>
                <legend class="text-lg">Type</legend>
                {#each ["Regular", "Employee"] as pass_type}
                    <label class="p-2 text-xl">
                        <input type="radio" bind:group={type} value={pass_type} />
                        {pass_type}
                    </label>
                {/each}
            </fieldset>
    
            <!-- Duration Selection -->
            <fieldset disabled={type === 'Employee'}>
            <legend class="text-xl">Duration</legend>
                {#each ["1", "3", "5"] as pass_duration}
                    <label class="p-2 text-xl">
                        <input type="radio" bind:group={duration} value={pass_duration} />
                        {pass_duration}
                    </label>
                {/each}
            </fieldset>
        </form>
    </div>
</main>

<style>
    :global(:root) {
        --animate-pulse-ring: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        --animate-pulse-dot: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
    }
    .pulsating-circle {
        position: absolute;
    
        &:before {
            content: '';
            position: relative;
            display: block;
            width: 300%;
            height: 300%;
            box-sizing: border-box;
            margin-left: -100%;
            margin-top: -100%;
            border-radius: 100%;
            background-color: #01a4e9;
            animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        &:after {
            content: '';
            position: absolute;
            left: 0; 
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 100%;
            box-shadow: 0 0 8px rgba(0,0,0,.3);
            animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite;
        }
    }

    @keyframes pulse-ring {
        0% {
            transform: scale(.33);
        }
        80%, 100% {
            opacity: 0;
        }
    }

    @keyframes pulse-dot {
        0% {
            transform: scale(.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(.8);
        }
    }
</style>