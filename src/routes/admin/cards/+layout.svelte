<script lang="ts">
    import { page } from "$app/state";
    import * as Tabs from "$lib/components/ui/tabs";

    const { children } = $props();
</script>

<div class="size-full p-4">
    <Tabs.Root value={page.url.pathname} class="h-full">
        <Tabs.List class="w-full">
            <Tabs.Trigger value="/admin/cards">
                {#snippet child({ props })}
                    <a href="/admin/cards" {...props}>
                        Overview
                    </a>
                {/snippet}
            </Tabs.Trigger>
            <Tabs.Trigger value="/admin/cards/register">
                {#snippet child({ props })}
                    <a href="/admin/cards/register" {...props}>
                        Register
                    </a>
                {/snippet}
            </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={page.url.pathname}>
            {@render children()}
        </Tabs.Content>
    </Tabs.Root>
</div>