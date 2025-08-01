<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AdminSidebar from "./admin-sidebar.svelte";
    import AdminHeader from "./admin-header.svelte";
 
    let { children } = $props();
</script>
 
<Sidebar.Provider>
    <AdminSidebar variant="inset"/>
    <Sidebar.Inset>
        <main>
            <AdminHeader />
            {@render children?.()}
        </main>
    </Sidebar.Inset>
</Sidebar.Provider>