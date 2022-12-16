<script lang="ts">
	import Navbar from '$lib/components/heading/navbar.svelte';
	import '../app.css';
	import '@fontsource/poppins';
	import BackToTop from '$lib/components/back_to_top.svelte';
	import toggleMenu, { toggle } from '$lib/store/menu';
	import Menu from '$lib/components/heading/menu.svelte';
	import { fade } from 'svelte/transition';

	let yPos: number = 0;
	let width: number = 0;

	$: if (width > 760) {
		$toggleMenu = false;
	}
</script>

<Navbar />

{#if !$toggleMenu}
	<div in:fade={{ duration: 100, delay: 300 }}>
		<slot />
	</div>
{:else}
	<Menu />
{/if}

<svelte:window bind:scrollY={yPos} bind:innerWidth={width} />

{#if yPos > 1000}
	<BackToTop />
{/if}
