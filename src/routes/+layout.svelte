<script lang="ts">
	import Navbar from '$lib/components/heading/navbar.svelte';
	import '../app.css';
	import '@fontsource/poppins';
	import BackToTop from '$lib/components/back_to_top.svelte';
	import toggleMenu from '$lib/store/menu';
	import Menu from '$lib/components/heading/menu.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	let yPos: number = 0;
	let width: number = 0;

	$: if (width > 760) {
		$toggleMenu = false;
	}
</script>

{#if $page.data.serverStatus === "offline"}
	<div class="fixed z-10 badge badge-xl badge-warning w-full text-lg">😦 Server is {$page.data.serverStatus}</div>
{/if}

<Navbar isAuthenticated={$page.data.authenticated} />

{#if !$toggleMenu}
	<div in:fade={{ duration: 100, delay: 300 }}>
		<slot />
	</div>
{:else}
	<Menu isAuthenticated={$page.data.authenticated} />
{/if}

<svelte:window bind:scrollY={yPos} bind:innerWidth={width} />

{#if yPos > 1000}
	<BackToTop />
{/if}