<script>
    import { page } from "$app/state";
</script>

<div class="flex gap-8">
    <a href="/registration" class={`text-lg ${page.url.pathname === '/registration' ? "active" : ""}`}>Registration</a>
    <a href="/verification" class={`text-lg ${page.url.pathname === '/verification' ? "active" : ""}`}>Verification</a>
</div>

<style>
    .active {
        font-weight: bold;
        color: dodgerblue;
        border-bottom: 2px solid dodgerblue;
    }
</style>