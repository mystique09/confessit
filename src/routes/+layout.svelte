<script lang="ts">
	import Navbar from '$lib/components/heading/navbar.svelte';
	import '../app.css';
	import '@fontsource/poppins';
	import BackToTop from '$lib/components/back_to_top.svelte';

	let yPos: number = 0;
</script>

<Navbar />
<slot />

<svelte:window bind:scrollY={yPos}></svelte:window>

{#if yPos > 1000}
	<BackToTop />
{/if}