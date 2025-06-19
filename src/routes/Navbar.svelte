<script>
    import { base } from "$app/paths";
    import { page } from "$app/state";
</script>

<div class="flex gap-8">
    <a href={`${base}/registration`} class={`text-lg ${page.url.pathname.includes('/registration') ? "active" : ""}`}>Registration</a>
    <a href={`${base}/verification`} class={`text-lg ${page.url.pathname.includes('/verification') ? "active" : ""}`}>Verification</a>
</div>

<style>
    .active {
        font-weight: bold;
        color: dodgerblue;
        border-bottom: 2px solid dodgerblue;
    }
</style>