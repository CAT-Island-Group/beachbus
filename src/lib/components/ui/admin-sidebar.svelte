<script lang="ts">
    import { page } from "$app/state";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import type { ComponentProps } from "svelte";
    import Button from "./button/button.svelte";

    let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props()

    const sidebar = Sidebar.useSidebar();

    const items = [
        {
            title: "Dashboard",
            url: "/admin",
        },
        {
            title: "Card Management",
            url: "/admin/cards",
        },
        {
            title: "Reader Management",
            url: "/admin/readers",
        },
        {
            title: "Users",
            url: "/admin/users",
        },
    ]
</script>

<Sidebar.Root {...restProps} >
    <Sidebar.Content>
        <Sidebar.Group class="gap-4">
            <Sidebar.GroupLabel><span class="text-xl">BeachBus</span></Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu class="gap-4" onclick={() => sidebar.setOpenMobile(false)}>
                {#each items as item (item.title)}
                    <Sidebar.MenuItem>
                        <Sidebar.MenuButton isActive={page.route.id === item.url}>
                            {#snippet child({ props })}
                            <a href={item.url} {...props}>
                                <span>{item.title}</span>
                            </a>
                            {/snippet}
                        </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>
        <form method="POST" action="/login?/logout" class="w-full flex flex-col">
            <Button type="submit">Sign Out</Button>
        </form>
    </Sidebar.Footer>
</Sidebar.Root>