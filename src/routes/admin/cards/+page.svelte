<script lang="ts">
    import * as Table from '$lib/components/ui/table';
    import { Button, buttonVariants } from '$lib/components/ui/button';
    import { BUS_STOPS, CARD_DURATIONS } from '$lib/consts';
    import * as Dialog from '$lib/components/ui/dialog';

    const { data } = $props();

    let transferTarget = $state("");
    let category = $state("");
    let amount = $state("0");
</script>

<div class="w-full grid gap-6">
    <div>
        <h3 class="text-lg font-medium">Inventory</h3>
        <Table.Root class="w-full table-fixed">
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-25">Bus Stop</Table.Head>
                    <Table.Head class="text-center">1</Table.Head>
                    <Table.Head class="text-center">3</Table.Head>
                    <Table.Head class="text-center">5</Table.Head>
                    <Table.Head class="p-0 text-center">E (Active)</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>Admin</Table.Cell>
                    <Table.Cell class="text-center">{data.adminCount['1']}</Table.Cell>
                    <Table.Cell class="text-center">{data.adminCount['3']}</Table.Cell>
                    <Table.Cell class="text-center">{data.adminCount['5']}</Table.Cell>
                    <Table.Cell class="text-center">{data.adminCount.Registered} ({data.adminCount.Active})</Table.Cell>
                </Table.Row>
                {#each data.busStops as busStop (busStop.id)}
                    <Table.Row>
                        <Table.Cell>{busStop.name}</Table.Cell>
                        <Table.Cell class="text-center">{busStop.cardCountReg1}</Table.Cell>
                        <Table.Cell class="text-center">{busStop.cardCountReg3}</Table.Cell>
                        <Table.Cell class="text-center">{busStop.cardCountReg5}</Table.Cell>
                        <Table.Cell class="text-center">{busStop.cardCountEmployee}</Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
    <div class="space-y-2">
        <h3 class="text-lg font-medium">Transfer</h3>
        <form class="grid grid-cols-2 gap-4">
            <select name="location" bind:value={transferTarget} class="p-1 border col-span-2 text-lg" required>
                <option value="" selected disabled hidden>Bus Stop</option>
                {#each BUS_STOPS as stop}
                    <option value={stop}>{stop}</option>
                {/each}
            </select>
            <select name="category" bind:value={category} class="p-1 border text-lg" required>
                <option value="" selected disabled hidden>Category</option>
                {#each CARD_DURATIONS as category}
                    <option value={category}>{category}-Day Pass</option>
                {/each}
                <option value='Employee'>Employee</option>
            </select>
            <input type="number" bind:value={amount} max={data.adminCount[category] ?? 0} class="py-1 px-2 border text-lg">
            <Dialog.Root>
                <Dialog.Trigger class={`col-span-2 ${buttonVariants({ variant: "default" })}`} disabled={!(transferTarget && category && amount > '0')}>
                    Transfer
                </Dialog.Trigger>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Confirm Transfer</Dialog.Title>
                    </Dialog.Header>
                    <div>
                        <p class="text-center">You are transferring the following:</p>
                        <Table.Root class="table-fixed">
                            <Table.Header>
                                <Table.Row>
                                    <Table.Head>Bus Stop</Table.Head>
                                    <Table.Head>Category</Table.Head>
                                    <Table.Head class="w-18 text-right">Amount</Table.Head>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell class="text-lg">{transferTarget}</Table.Cell>
                                    <Table.Cell class="text-lg">{category}{category === "Employee" ? "" : "-Day"} Pass</Table.Cell>
                                    <Table.Cell class="text-lg text-right">{amount}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    </div>
                    <Dialog.Footer>
                        <Button>Transfer</Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </form>
    </div>
</div>