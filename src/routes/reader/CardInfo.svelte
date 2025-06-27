<script lang="ts">
    interface Props {
        card: {
            uid: string,
            type: "Regular" | "Employee",
            usage: number,
            status: "Registered" | "Active" | "Used",
            expiresAt?: string
        }
    }

    const { card }: Props = $props();
    const { type, usage, status, expiresAt: expiryStr } = card;
    const expiresAt = expiryStr ? new Date(expiryStr) : null;
    const error = card.type === "Employee" && card.usage === 0 || expiresAt && Date.now() > expiresAt.valueOf();
</script>

<div class="mt-8 w-full h-48 grid grid-cols-2 text-center">
    <div class="col-span-1">
        <p>Pass Info</p>
        <p class="text-lg font-bold">{type}</p>
        <p class="text-lg font-bold">{usage} {`${type === "Regular" ? "Day" : "Use"}${usage > 1 ? "s" : ""}`}</p>
        <br>
        <p>Expiry</p>
        <p class="text-lg font-bold">
            {#if expiresAt}
                {@const formatter = new Intl.DateTimeFormat("en-US", { timeStyle: "short", dateStyle: "medium" })}
                {formatter.format(expiresAt)}
            {:else}
                N/A
            {/if}
        </p>
    </div>
    <div class="col-span-1 flex flex-col">
        <p>Status</p>
        <div class={`flex-1 flex flex-col justify-evenly items-center ${error ? "text-rose-600" : "text-green-600"}`}>
            {#if error}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-15">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            {:else}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-15">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            {/if}
            <p class="text-xl font-bold">
                {#if status === "Registered"}
                    For Activation
                {:else if status === "Active"}
                    Ready for Use
                {:else if Date.now() > expiresAt!.valueOf()}
                    Card Expired
                {:else if card.type === "Employee" && card.usage === 0}
                    Daily Allotment Used
                {:else}
                    In Use
                {/if}
            </p>
        </div>
    </div>
</div>