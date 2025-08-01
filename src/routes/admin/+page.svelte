<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Chart from "$lib/components/ui/chart/index.js";

    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        },
        mobile: {
            label: "Mobile",
            color: "#60a5fa",
        },
    } satisfies Chart.ChartConfig;
</script>

<div class="p-4 lg:p-6 w-full grid grid-cols-2 xl:grid-cols-4 gap-4">
    <Card.Root>
        <Card.Header>
            <Card.Description>Total Revenue</Card.Description>
            <Card.Title class="text-3xl font-semibold tabular-nums">
                $1,250.00
            </Card.Title>
        </Card.Header>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root>
        <Card.Header>
            <Card.Description>Total Cards Sold</Card.Description>
            <Card.Title class="text-3xl font-semibold tabular-nums">
                <span>36</span>
            </Card.Title>
        </Card.Header>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Description>Cards Purchased per Denomination</Card.Description>
            <Card.Title class="flex gap-12 text-3xl font-semibold tabular-nums">
                <span>12</span>
                <span>12</span>
                <span>12</span>
            </Card.Title>
        </Card.Header>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Sales Stats per Stop</Card.Description>
        </Card.Header>
        <Card.Content class="flex gap-12 text-3xl font-semibold tabular-nums">
            <!-- <Chart.Container config={chartConfig} class="min-h-[200px] w-full">
                <BarChart
                    data={chartData}
                    xScale={scaleBand().padding(0.25)}
                    x="month"
                    axis="x"
                    seriesLayout="group"
                    tooltip={false}
                    series={[
                    {
                        key: "desktop",
                        label: chartConfig.desktop.label,
                        color: chartConfig.desktop.color
                    },
                    {
                        key: "mobile",
                        label: chartConfig.mobile.label,
                        color: chartConfig.mobile.color
                    }
                    ]}
                />
            </Chart.Container> -->
            <!-- Bar Chart goes here! -->
             Sales Stats per Shop
        </Card.Content>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Boarding Stats per Stop</Card.Description>
        </Card.Header>
        <Card.Content class="flex gap-12 text-3xl font-semibold tabular-nums">
            <!-- <Chart.Container config={chartConfig} class="min-h-[200px] w-full">
                <BarChart
                    data={chartData}
                    xScale={scaleBand().padding(0.25)}
                    x="month"
                    axis="x"
                    seriesLayout="group"
                    tooltip={false}
                    series={[
                    {
                        key: "desktop",
                        label: chartConfig.desktop.label,
                        color: chartConfig.desktop.color
                    },
                    {
                        key: "mobile",
                        label: chartConfig.mobile.label,
                        color: chartConfig.mobile.color
                    }
                    ]}
                />
            </Chart.Container> -->
            <!-- Stacked Bar Chart goes here! -->
             Boarding Stats per Shop
        </Card.Content>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>

    <Card.Root class="col-span-full">
        <Card.Header>
            <Card.Description>Inventory</Card.Description>
        </Card.Header>
        <Card.Content class="flex gap-12 text-3xl font-semibold tabular-nums">
            <!-- <Chart.Container config={chartConfig} class="min-h-[200px] w-full">
                <BarChart
                    data={chartData}
                    xScale={scaleBand().padding(0.25)}
                    x="month"
                    axis="x"
                    seriesLayout="group"
                    tooltip={false}
                    series={[
                    {
                        key: "desktop",
                        label: chartConfig.desktop.label,
                        color: chartConfig.desktop.color
                    },
                    {
                        key: "mobile",
                        label: chartConfig.mobile.label,
                        color: chartConfig.mobile.color
                    }
                    ]}
                />
            </Chart.Container> -->
            <!-- Tables go here! -->
             Inventory Information per Distributor
        </Card.Content>
        <Card.Footer class="flex-col items-start gap-1.5 text-sm">
            <div class="text-muted-foreground">Visitors for the last 6 months</div>
        </Card.Footer>
    </Card.Root>
</div>