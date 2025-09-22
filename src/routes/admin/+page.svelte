<script lang="ts">
    import { scaleBand } from "d3-scale";
    import { BarChart, type ChartContextValue } from "layerchart";
    import { cubicInOut } from "svelte/easing";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Chart from "$lib/components/ui/chart/index.js";
    import * as Table from "$lib/components/ui/table/index.js";

    let { data } = $props();

    const chartData = [
        { day: "Mon", desktop: 186 },
        { day: "Tue", desktop: 305 },
        { day: "Wed", desktop: 237 },
        { day: "Thu", desktop: 73 },
        { day: "Fri", desktop: 209 },
        { day: "Sat", desktop: 214 },
        { day: "Sun", desktop: 280 },
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
    } satisfies Chart.ChartConfig;

    let context = $state<ChartContextValue>();
</script>

<div class="p-4 lg:p-6 w-full grid grid-cols-2 xl:grid-cols-4 gap-4">
    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Admin Card Inventory</Card.Description>
            <Card.Title class="flex gap-8 font-semibold tabular-nums">
                <Table.Root class="w-full table-fixed">
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>1-Day</Table.Head>
                            <Table.Head>3-Day</Table.Head>
                            <Table.Head>5-Day</Table.Head>
                            <Table.Head>E (Active)</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row class="text-lg">
                            <Table.Cell>{data.adminCount['1']}</Table.Cell>
                            <Table.Cell>{data.adminCount['3']}</Table.Cell>
                            <Table.Cell>{data.adminCount['5']}</Table.Cell>
                            <Table.Cell>{data.adminCount.Registered} ({data.adminCount.Active})</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Title>
        </Card.Header>
    </Card.Root>

    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Activations per Stop</Card.Description>
        </Card.Header>
        <Card.Content class="flex gap-8 text-3xl font-semibold tabular-nums">
            <Chart.Container config={chartConfig} class="min-h-50 w-full">
                <BarChart
                    bind:context
                    data={chartData}
                    xScale={scaleBand().padding(0.25)}
                    x="day"
                    axis="x"
                    series={[{ key: "desktop", label: "Desktop", color: chartConfig.desktop.color }]}
                    props={{
                    bars: {
                        stroke: "none",
                        rounded: "all",
                        radius: 8,
                    },
                    highlight: { area: { fill: "none" } },
                    xAxis: { format: (d) => d.slice(0, 3) },
                    }}
                >
                    {#snippet tooltip()}
                        <Chart.Tooltip hideLabel />
                    {/snippet}
                </BarChart>
            </Chart.Container>
        </Card.Content>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last week</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Boarding Stats per Stop</Card.Description>
        </Card.Header>
        <Card.Content class="flex gap-8 text-3xl font-semibold tabular-nums">
            <Chart.Container config={chartConfig} class="min-h-50 w-full">
                <BarChart
                    bind:context
                    data={chartData}
                    xScale={scaleBand().padding(0.25)}
                    x="day"
                    axis="x"
                    series={[{ key: "desktop", label: "Desktop", color: chartConfig.desktop.color }]}
                    props={{
                    bars: {
                        stroke: "none",
                        rounded: "all",
                        radius: 8,
                    },
                    highlight: { area: { fill: "none" } },
                    xAxis: { format: (d) => d.slice(0, 3) },
                    }}
                >
                    {#snippet tooltip()}
                        <Chart.Tooltip hideLabel />
                    {/snippet}
                </BarChart>
            </Chart.Container>
        </Card.Content>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last week</div>
        </Card.Footer>
    </Card.Root>
</div>