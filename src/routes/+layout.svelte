<script lang="ts">
	import '../app.css';
    import { onMount, setContext } from 'svelte';
    import { NFCScanner } from './NFCScanner.svelte';
	
	let { children } = $props();

	onMount(() => {
		const nfc = new NFCScanner();
		if (!nfc.error) setContext("nfc", nfc);
	})
</script>

{@render children()}
