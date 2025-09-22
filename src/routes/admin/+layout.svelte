<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AdminSidebar from "../../lib/components/ui/admin-sidebar.svelte";
    import AdminHeader from "../../lib/components/ui/admin-header.svelte";
 
    let { children } = $props();
</script>
 
<Sidebar.Provider>
    <AdminSidebar variant="inset"/>
    <Sidebar.Inset>
        <AdminHeader />
        {@render children?.()}
    </Sidebar.Inset>
</Sidebar.Provider>