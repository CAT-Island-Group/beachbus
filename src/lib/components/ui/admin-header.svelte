<script lang="ts">
    import { page } from "$app/state";
    import { Separator } from "$lib/components/ui/separator/index.js";
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";

    const sidebar = Sidebar.useSidebar();

    const titles: { [index: string]: string } = {
        "/admin": "Dashboard",
        "/admin/cards": "Card Management",
        "/admin/cards/register": "Card Management",
        "/admin/readers": "Reader Management",
        "/admin/users": "Users",
    }
</script>

<header
    class="h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {#if sidebar.isMobile}
            <Sidebar.Trigger class="-ml-1" />
            <Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
        {/if}
        <h1 class="text-base font-medium">{titles[page.route.id!]}</h1>
    </div>
</header>