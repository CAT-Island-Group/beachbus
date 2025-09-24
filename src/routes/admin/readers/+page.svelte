<script lang="ts">
    import { enhance } from "$app/forms";
    import * as Table from "$lib/components/ui/table";
    import { READER_MODES, BUS_STOPS } from "$lib/consts";

    let { data } = $props();
    let reader_mode = $state("");
    let reader_location = $state("");
</script>

<main class="w-full p-4">
    <form id="register" method="POST" action="?/register"></form>
    <Table.Root class="w-full">
        <Table.Header>
            <Table.Row>
                <Table.Head class="min-w-content">Reader ID</Table.Head>
                <Table.Head class="pl-4">Mode</Table.Head>
                <Table.Head class="pl-4">Location</Table.Head>
                <Table.Head class="w-1"></Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <button form="register" type="submit" class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600">
                        {data.config ? 'Edit' : 'Add'} Reader
                    </button>
                </Table.Cell>
                <Table.Cell>
                    <select form="register" name="mode" bind:value={reader_mode} class="p-1 w-full border" required>
                        <option value="" selected disabled hidden>Mode</option>
                        {#each READER_MODES as mode}
                            <option value={mode}>{mode}</option>
                        {/each}
                    </select>
                </Table.Cell>
                <Table.Cell>
                    <select form="register" name="location" bind:value={reader_location} class="p-1 w-full border" required>
                        <option value="" selected disabled hidden>Location</option>
                        {#each BUS_STOPS as stop}
                            <option value={stop}>{stop}</option>
                        {/each}
                    </select>
                </Table.Cell>
                <Table.Cell>
                    {#if data.config}
                        <form method="POST" action="?/unregister" use:enhance>
                            <input class="hidden" name="reader_id" value={data.config.id}>
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                    <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    {/if}
                </Table.Cell>
            </Table.Row>
            {#await data.readers}
                <Table.Row>
                    No readers found.
                </Table.Row>
            {:then readers}
                {#each readers as reader (reader.id)}
                <Table.Row class={data.config?.id === reader.id ? 'bg-muted' : ''}>
                    <Table.Cell class="max-w-1 truncate">{reader.id}</Table.Cell>
                    <Table.Cell class="pl-4">{reader.mode}</Table.Cell>
                    <Table.Cell class="pl-4">{reader.location}</Table.Cell>
                    <Table.Cell>
                        <form method="POST" action="?/unregister" use:enhance>
                            <input class="hidden" name="reader_id" value={reader.id}>
                            <!-- svelte-ignore a11y_consider_explicit_label -->
                            <button class="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                    <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </Table.Cell>
                </Table.Row>
                {/each}
            {:catch}
                <Table.Row>
                    An error occurred.
                </Table.Row>
            {/await}
        </Table.Body>
    </Table.Root>
</main>